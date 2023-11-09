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
  const [isSnapshotLoaded, setIsSnapshotLoaded] = useState(false);

  const setAppToState = useCallback((editorInstance) => {
    setEditor(editorInstance);
  }, []);

  useEffect(() => {
    if (editor && !isSnapshotLoaded) {
      editor.store.loadSnapshot(initialSnapshot);
      setIsSnapshotLoaded(true);
    }
  }, [editor, initialSnapshot, isSnapshotLoaded]);

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
