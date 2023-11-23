import React, { useState } from "react";
import { useBosLoaderStore } from "../../../stores/bos-loader";
import { createShapeId, useEditor } from "@tldraw/editor";
import Modal from "../../common/Modal";
import Thing from "../../Thing";
import { Widget } from "near-social-vm";

function ShareZone() {
  const [isModalOpen, setModalOpen] = useState(false);
  const redirectMapStore = useBosLoaderStore();
  const editor = useEditor();
  const [responseShapeId, setResponseShapeId] = useState("");
  const [activePlugin, setActivePlugin] = useState("SAVE_CANVAS");

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

  return (
    <>
      <Widget
        src="everycanvas.near/widget/sharezone"
        props={{
          setModalOpen: setModalOpen,
          getSnapshot: () => editor.store.getSnapshot(),
          shape: {
            id: responseShapeId,
            type: "thing",
          },
          updateShape: (v) => editor.updateShape(v),
        }}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
      />
      {isModalOpen && (
        <Thing
          isModalOpen={isModalOpen}
          onMount={() => {
            // we get selected shapes
            // const selectedShapes = editor.getSelectedShapes();
            // if (selectedShapes.length === 0) {
            //   throw new Error("First select something to make real.");
            // }
            // then, we create an empty response shape. we'll put the response from openai in here, but for
            // now it'll just show a spinner so the user knows we're working on it.

            const responseShapeId = makeEmptyResponseShape(editor);
            // (we are creating a shape on canvas before the "transaction")

            setResponseShapeId(responseShapeId);

          }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default ShareZone;
