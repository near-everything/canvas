import { Tldraw, track, Canvas, useEditor } from "@tldraw/tldraw";
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

    if (props.initialShapes) {
      editor.createShapes(props.initialShapes);
    }

    return () => {
      if (props.handleChangeEvent) {
        editor.off("change", (change) => props.handleChangeEvent(change));
      }
    };
  }, [editor]);

  const handleUiEvent = useCallback((name, data) => {
    if (props.handleUiEvent) {
      props.handleUiEvent(name, data);
    }
  }, []);

  const CustomUi = track(() => {
    const editor = useEditor();

    if (props.Custom) {
      const Custom = props.Custom;
      return (
        <div className="custom-layout">
          <div className="custom-toolbar">
            <Custom
              selectedShapeIds={editor.selectedShapeIds}
              selectedShapes={editor.getContentFromCurrentPage(
                editor.selectedShapeIds
              )}
              deleteShapes={(v) => editor.deleteShapes(v)}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="custom-layout">
        <div className="custom-toolbar">
          <button
            className="custom-button"
            data-isactive={editor.currentToolId === "select"}
            onClick={() => {
              if (props.handlePublish) {
                props.handlePublish(
                  // Do something with the selection of shapes
                  editor.getContentFromCurrentPage(editor.selectedShapeIds)
                );
              }
              // editor.setCurrentTool('select')
            }}
          >
            Publish
          </button>
        </div>
      </div>
    );
  });

  return (
    <Tldraw
      persistenceKey={props.persistenceKey}
      autoFocus={props.autoFocus}
      hideUi={props.hideUi}
      onMount={setAppToState}
      onUiEvent={handleUiEvent}
    >
      <Canvas />
      <CustomUi />
    </Tldraw>
  );
}

export default EverythingCanvas;
