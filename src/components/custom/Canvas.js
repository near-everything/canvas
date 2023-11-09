import { Canvas, Tldraw } from "@tldraw/tldraw";
import React, { useCallback, useEffect, useState } from "react";

function EverythingCanvas(props) {
  const [editor, setEditor] = useState();

  const setAppToState = useCallback((editor) => {
    setEditor(editor);
  }, []);

  useEffect(() => {
    if (!editor) return;

    if (props.handleChangeEvent) {
      editor.on("change", (change) => props.handleChangeEvent(change));
    }

    if (props.initialSnapshot) {
      editor.store.loadSnapshot(props.initialSnapshot);
    }

    if (props.initialShapes) {
      editor.createShapes(props.initialShapes);
    }

    return () => {
      if (props.handleChangeEvent) {
        editor.off("change", (change) => props.handleChangeEvent(change));
      }
    };
  }, [editor]);

  useEffect(() => {
    if (props.trigger) {
      const snapshot = editor.store.getSnapshot();
      const stringified = JSON.stringify(snapshot);
      props.onGetData(stringified);
    }
  }, [props.trigger, props.onGetData]);

  return (
    <Tldraw
      persistenceKey={props.persistenceKey}
      autoFocus={props.autoFocus}
      hideUi={props.hideUi}
      onMount={setAppToState}
    >
      <Canvas />
    </Tldraw>
  );
}

export default EverythingCanvas;
