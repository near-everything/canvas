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
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useBosLoaderStore } from "../stores/bos-loader";

const systemPrompt = `You are an expert web developer who specializes in tailwind css.
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

const StyledActionButton = styled.div`
  position: fixed;
  z-index: 1000;
  border-radius: 50%;
  cursor: pointer;
  background: radial-gradient(circle at 30% 30%, #4a4949, #000000);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06),
    0px 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease; // smooth transition

  &:hover {
    background: radial-gradient(circle at 70% 30%, #4a4949, #000000);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    transform: scale(0.98) translateY(4px); // scale down slightly and move downward
  }

  &:active {
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.2);
    transform: scale(0.96) translateY(6px); // more scale down and more downward movement for click
  }

  /* Desktop and Tablet */
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
    right: 30px;
    bottom: 50px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    width: 100px;
    height: 100px;
    right: 15px;
    bottom: 110px;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1002;
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  float: right;
`;

function Modal({ onClose, children }) {
  return (
    <ModalBackdrop>
      <ModalBox>
        <CloseButton onClick={onClose}>Close</CloseButton>
        {children}
      </ModalBox>
    </ModalBackdrop>
  );
}

export function ActionButton() {
  const [isModalOpen, setModalOpen] = useState(false);
  const redirectMapStore = useBosLoaderStore();
  const [messages, setMessages] = useState("");
  const [responseShapeId, setRepsonseShapeId] = useState("");

  const editor = useEditor();

  const createMessages = useCallback(async (e) => {
    setModalOpen(true);
    e.preventDefault();

    const selectedShapes = editor.getSelectedShapes();
    if (selectedShapes.length === 0) {
      throw new Error("First select something to make real.");
    }

    // first, we build the prompt that we'll send to openai.
    const prompt = await buildPromptForOpenAi(editor);
    console.log(prompt);
    setMessages(JSON.stringify(prompt));

    // then, we create an empty response shape. we'll put the response from openai in here, but for
    // now it'll just show a spinner so the user knows we're working on it.
    const responseShapeId = makeEmptyResponseShape(editor);
    setRepsonseShapeId(responseShapeId);
  }, []);

  const setResponse = (response) => {
    populateResponseShape(editor, responseShapeId, response);
  };

  return (
    <>
      <StyledActionButton onClick={createMessages} />
      {isModalOpen && (
        <Modal
          onClose={() => {
            editor.deleteShapes([responseShapeId]);
            setModalOpen(false);
          }}
        >
          <Widget
            key={"everycanvas.near/widget/magic"}
            src="everycanvas.near/widget/magic"
            props={{
              model: "gpt-4-vision-preview",
              messages: messages,
              setResponse: setResponse,
            }}
            config={{
              redirectMap: redirectMapStore.redirectMap,
            }}
          />
        </Modal>
      )}
    </>
  );
}

async function buildPromptForOpenAi(editor) {
  // the user messages describe what the user has done and what they want to do next. they'll get
  // combined with the system prompt to tell gpt-4 what we'd like it to do.
  const userMessages = [
    {
      type: "image_url",
      image_url: {
        // send an image of the current selection to gpt-4 so it can see what we're working with
        url: await getSelectionAsImageDataUrl(editor),
        detail: "high",
      },
    },
    {
      type: "text",
      text: "Turn this into a single html file using tailwind.",
    },
    {
      // send the text of all selected shapes, so that GPT can use it as a reference (if anything is hard to see)
      type: "text",
      text: getSelectionAsText(editor),
    },
  ];

  // if the user has selected a previous response from gpt-4, include that too. hopefully gpt-4 will
  // modify it with any other feedback or annotations the user has left.
  const previousResponseContent = getContentOfPreviousResponse(editor);
  if (previousResponseContent) {
    userMessages.push({
      type: "text",
      text: previousResponseContent,
    });
  }

  // combine the user prompt with the system prompt
  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessages },
  ];
}

function populateResponseShape(editor, responseShapeId, openAiResponse) {
  if (openAiResponse.error) {
    throw new Error(openAiResponse.error.message);
  }

  // extract the html from the response
  const message = openAiResponse.choices[0].message.content;
  const start = message.indexOf("<!DOCTYPE html>");
  const end = message.indexOf("</html>");
  const html = message.slice(start, end + "</html>".length);

  // update the response shape we created earlier with the content
  editor.updateShape <
    ResponseShape >
    {
      id: responseShapeId,
      type: "response",
      props: { html },
    };
}

function makeEmptyResponseShape(editor) {
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
}

function getContentOfPreviousResponse(editor) {
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
}

function getSelectionAsText(editor) {
  const selectedShapeIds = editor.getSelectedShapeIds();
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
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function getSelectionAsImageDataUrl(editor) {
  const svg = await editor.getSvg(editor.getSelectedShapes());
  if (!svg) throw new Error("Could not get SVG");

  const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const blob = await getSvgAsImage(svg, IS_SAFARI, {
    type: "png",
    quality: 1,
    scale: 1,
  });

  if (!blob) throw new Error("Could not get blob");
  return await blobToBase64(blob);
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
