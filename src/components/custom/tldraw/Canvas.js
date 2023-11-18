import { Tldraw } from "@tldraw/tldraw";
import React from "react";
import { ActionButton } from "../../ActionButton";
import { ResponseShapeUtil } from "./ResponseShape";
import ShareZone from "./ShareZone";
import { TldrawLogo } from "./TldrawLogo";

const shapeUtils = [ResponseShapeUtil];

function EverythingCanvas({ persistenceKey, autoFocus, hideUi, plugins }) {
  // const [editor, setEditor] = useState();

  // const setAppToState = useCallback((editorInstance) => {
  //   setEditor(editorInstance);
  //   editorInstance.store.loadSnapshot(initialSnapshot);
  // }, []);

  return (
    <div className={"tldraw__editor"}>
      <Tldraw
        persistenceKey={persistenceKey || "everyone"}
        shapeUtils={shapeUtils}
        shareZone={
          <div className={"tldraw__shareZone"}>
            <ShareZone />
          </div>
        }
        autoFocus={autoFocus ?? true}
        hideUi={hideUi ?? false}
      >
        <ActionButton />
        <TldrawLogo />
      </Tldraw>
    </div>
    // <Tldraw
    //   persistenceKey={persistenceKey}
    //   autoFocus={autoFocus}
    //   hideUi={hideUi}
    //   onMount={setAppToState}
    // >
    //   <Canvas />
    // </Tldraw>
  );
}

export default EverythingCanvas;
