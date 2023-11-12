import { Canvas, Tldraw } from "@tldraw/tldraw";
import React, { useCallback, useEffect, useState } from "react";

function EverythingCanvas({
  initialSnapshot,
  trigger,
  onGetData,
  persistenceKey,
  autoFocus,
  hideUi,
}) {
  const [editor, setEditor] = useState();

  const setAppToState = useCallback((editorInstance) => {
    setEditor(editorInstance);
    editorInstance.store.loadSnapshot(initialSnapshot);
  }, []);

  useEffect(() => {
    if (trigger) {
      const snapshot = editor.store.getSnapshot();
      const stringified = JSON.stringify(snapshot);
      onGetData(stringified);
    }
  }, [trigger, onGetData]);

  return (
    <Tldraw
      persistenceKey={persistenceKey}
      autoFocus={autoFocus}
      hideUi={hideUi}
      onMount={setAppToState}
    >
      <Canvas />
    </Tldraw>
  );
}

export default EverythingCanvas;
