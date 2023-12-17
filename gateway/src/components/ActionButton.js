import { createShapeId, getSvgAsImage, useEditor } from "@tldraw/tldraw";
import { Widget } from "near-social-vm";
import React, { useCallback } from "react";
import { useBosLoaderStore } from "../stores/bos-loader";

export function ActionButton({ path }) {
  // This is within the canvas, so we can use the editor
  const redirectMapStore = useBosLoaderStore();

  const editor = useEditor();

  const getSelectedShapes = useCallback(() => {
    return editor.getSelectedShapes();
  }, [editor]);

  const getSnapshot = useCallback(() => {
    return editor.store.getSnapshot();
  });

  const getSelectionAsText = useCallback(() => {
    const selectedShapeIds = editor.getSelectedShapeIds();
    console.log("selectedShapeIds", selectedShapeIds);
    const selectedShapeDescendantIds =
      editor.getShapeAndDescendantIds(selectedShapeIds);

    const texts = Array.from(selectedShapeDescendantIds)
      .map((id) => {
        const shape = editor.getShape(id);
        if (!shape) return null;
        if (
          shape.type === "text" ||
          shape.type === "geo" ||
          shape.type === "arrow" ||
          shape.type === "note"
        ) {
          // @ts-expect-error
          return shape.props.text;
        }
        return null;
      })
      .filter((v) => v !== null && v !== "");

    return texts.join("\n");
  }, [editor]);

  const getSelectionAsImageDataUrl = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      try {
        const svg = await editor.getSvg(editor.getSelectedShapes());
        if (!svg) throw new Error("Could not get SVG");

        const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        );

        const blob = await getSvgAsImage(svg, IS_SAFARI, {
          type: "png",
          quality: 1,
          scale: 1,
        });

        if (!blob) throw new Error("Could not get blob");
        const base64Data = await blobToBase64(blob);

        resolve(base64Data);
      } catch (error) {
        reject(error);
      }
    });
  }, [editor]);

  const getContentOfPreviousResponse = useCallback(() => {
    const previousResponses = editor
      .getSelectedShapes()
      .filter((shape) => shape.type === "response");

    if (previousResponses.length === 0) {
      return null;
    }

    if (previousResponses.length > 1) {
      throw new Error("You can only have one previous response selected");
    }

    return previousResponses[0].props.html;
  }, [editor]);

  const makeEmptyResponseShape = useCallback(() => {
    const selectionBounds = editor.getSelectionPageBounds();
    if (!selectionBounds) throw new Error("No selection bounds");

    const newShapeId = createShapeId();
    editor.createShape({
      id: newShapeId,
      type: "response",
      x: selectionBounds.maxX + 60,
      y: selectionBounds.y,
    });

    return newShapeId;
  }, [editor]);

  const populateResponseShape = useCallback(
    (responseShapeId, content) => {
      // extract the html from the response
      const message = content;
      const start = message.indexOf("<!DOCTYPE html>");
      const end = message.indexOf("</html>");
      const html = message.slice(start, end + "</html>".length);

      // update the response shape we created earlier with the content
      editor.updateShape({
        id: responseShapeId,
        type: "response",
        props: { html },
      });
    },
    [editor]
  );

  return (
    <>
      <Widget // this is the widget that will send the prompt to openai and display the response
        src="everycanvas.near/widget/tldraw.Action"
        props={{
          path,
          getSnapshot: getSnapshot,
          getSelectedShapes: getSelectedShapes,
          getSelectionAsText: getSelectionAsText,
          getSelectionAsImageDataUrl: getSelectionAsImageDataUrl,
          getContentOfPreviousResponse: getContentOfPreviousResponse,
          makeEmptyResponseShape: makeEmptyResponseShape,
          populateResponseShape: populateResponseShape,
        }}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
      />
    </>
  );
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
