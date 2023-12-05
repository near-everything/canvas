/**
 * this is your action -- it's what happens after you click the black button.
 *
 * what do you want it to do?
 *
 * This one opens up a modal, acts as an API for shapes on the canvas (make an api?)
 * then closes the modal
 *
 */
import { createShapeId, getSvgAsImage, useEditor } from "@tldraw/tldraw";
import { Widget } from "near-social-vm";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useBosLoaderStore } from "../stores/bos-loader";

// move this to the modal
const systemPrompt = `You are an expert web developer who specializes in inline bootstrap css classes.
A user will provide you with a low-fidelity wireframe of an application. 
You will return a single html file that uses HTML, tailwind css, and JavaScript to create a high fidelity website.
Include any extra CSS and JavaScript in the html file.
If you have any images, load them from Unsplash or use solid colored rectangles.
The user will provide you with notes in blue or red text, arrows, or drawings.
The user may also include images of other websites as style references. Transfer the styles as best as you can, matching fonts / colors / layouts.
They may also provide you with the html of a previous design that they want you to iterate from.
Carry out any changes they request from you.
In the wireframe, the previous design's html will appear as a white rectangle.
For your reference, all text from the image will also be provided to you as a list of strings, separated by newlines. Use them as a reference if any text is hard to read.
Use creative license to make the application more fleshed out.
Use JavaScript modules and unpkg to import any necessary dependencies.

Respond ONLY with the contents of the html file.`;

export function ActionButton({ path }) {
  // This is within the canvas, so we can use the editor

  const redirectMapStore = useBosLoaderStore();
  const [messages, setMessages] = useState("");
  const [responseShapeId, setRepsonseShapeId] = useState("");

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

  const populateResponseShape = useCallback((responseShapeId, content) => {
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
  }, [editor]);

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
          populateResponseShape: populateResponseShape
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

// const deleteShapes = useCallback((shapes) => {
//   editor.deleteShapes(shapes);
// }, []);

// const getShapePageBounds = useCallback((shape) => {
//   return editor.getShapePageBounds(shape);
// }, []);

// const getSelectedShapeIds = useCallback(() => {
//   return editor.getSelectedShapeIds();
// }, []);

// const getSelectedShapes = useCallback(() => {
//   return editor.getSelectedShapes();
// }, []);

// const createShapeId = useCallback(() => {
//   createShapeId();
// }, []);

// const createShape = useCallback((shape) => {
//   editor.createShape(shape);
// }, []);

// const updateShape = useCallback((shape) => {
//   editor.updateShape(shape);
// }, []);

// const getSnapshot = useCallback(() => {
//   return editor.store.getSnapshot();
// });

// const toggleModal = () => {
//   setModalOpen(!isModalOpen);
// };

// const asSvg = useCallback(async (shapes) => {
//   const svg = await editor.getSvg(shapes);
//   return svg;
// }, []);

// const asPng = useCallback(async (svg) => {
//   const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(
//     navigator.userAgent
//   );
//   const blob = await getSvgAsImage(svg, IS_SAFARI, {
//     type: "png",
//     quality: 1,
//     scale: 1,
//   });
//   return blob;
// }, []);

// const asDataUrl = useCallback(async (blob) => {
//   const dataUrl = await blobToBase64(blob);
//   return dataUrl;
// }, []);

// function blobToBase64(blob) {
//   return new Promise((resolve, _) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.readAsDataURL(blob);
//   });
// }
