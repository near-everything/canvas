import { useEditor, createShapeId } from "@tldraw/tldraw";
import { Widget } from "near-social-vm";
import React, { useCallback } from "react";
import { useBosLoaderStore } from "../../../stores/bos-loader";

function ShareZone({ path }) {
  const editor = useEditor();
  const redirectMapStore = useBosLoaderStore();

  const getSelectedShapeIds = useCallback(() => {
    return editor.getSelectedShapeIds();
  }, [editor]);

  const getSelectedShapes = useCallback(() => {
    return editor.getSelectedShapes();
  }, [editor]);

  const getShapePageBounds = useCallback(() => {
    return editor.getShapePageBounds();
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

  const loadSnapshot = useCallback((snapshot) => {
    console.log("loading snapshot", snapshot);
    snapshot = typeof snapshot === "string" ? JSON.parse(snapshot) : snapshot;
    editor.store.loadSnapshot(snapshot);
  });

  const makeEmptyResponseShape = useCallback(() => {
    const selectionBounds = editor.getSelectionPageBounds();
    if (!selectionBounds) throw new Error("No selection bounds");

    const newShapeId = createShapeId();
    editor.createShape({
      id: newShapeId,
      type: "response",
      x: selectionBounds.maxX + 60,
      y: selectionBounds.y,
      props: { html: "" },
    });

    console.log(
      `created shape: ${newShapeId} of size x:${
        selectionBounds.maxX + 60
      }, y: ${selectionBounds.y}`
    );

    return newShapeId;
  }, [editor]);

  const populateResponseShape = useCallback(
    (responseShapeId, path) => {
      console.log("updating shape:", responseShapeId);
      // extract the html from the response
      const html = `
      <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Near social</title>
  
      <script src="/main.0b24e2f1d95a52ba93ad.bundle.js" defer></script>
      <script src="/runtime.11b6858f93d8625836ab.bundle.js" defer></script>
    </head>
    <body>
      <near-social-viewer src=${path}></near-social-viewer>
    </body>
  </html>
      `;

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
    <Widget
      key={JSON.stringify(getSelectedShapeIds)}
      src="everycanvas.near/widget/tldraw.ShareZone"
      props={{
        getSnapshot: getSnapshot,
        getSelectedShapes: getSelectedShapes,
        getShapePageBounds: getShapePageBounds,
        getSelectionAsText: getSelectionAsText,
        makeEmptyResponseShape: makeEmptyResponseShape,
        populateResponseShape: populateResponseShape,
        path: path,
        loadSnapshot: loadSnapshot,
      }}
      config={{
        redirectMap: redirectMapStore.redirectMap,
      }}
    />
  );
}

export default ShareZone;
