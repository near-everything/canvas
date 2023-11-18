import { Tldraw, useEditor } from "@tldraw/tldraw";
import React, { useCallback } from "react";
import { ResponseShapeUtil } from "./ResponseShape";
import { TldrawLogo } from "./TldrawLogo";
import { Widget } from "near-social-vm";
import { ActionButton } from "../../ActionButton";
import { useBosLoaderStore } from "../../../stores/bos-loader";

const shapeUtils = [ResponseShapeUtil];

function SaveButton() {
  const editor = useEditor();
  const redirectMapStore = useBosLoaderStore();
  // const snapshot = editor.store.getSnapshot();

  const selectedShapes = editor.getSelectedShapes();

  return (
    <Widget
      src="everycanvas.near/widget/save"
      props={{ selectedShapes }}
      config={{
        redirectMap: redirectMapStore.redirectMap,
      }}
    />
  );
}

function EverythingCanvas({
  persistenceKey,
  autoFocus,
  hideUi,
}) {
  // const [editor, setEditor] = useState();

  // const setAppToState = useCallback((editorInstance) => {
  //   setEditor(editorInstance);
  //   editorInstance.store.loadSnapshot(initialSnapshot);
  // }, []);


  return (
    <div className={"tldraw__editor"}>
      <Tldraw
        persistenceKey={"tldraw"}
        shapeUtils={shapeUtils}
        shareZone={
          <div className={"tldraw__shareZone"}>
            {/* We can put whatever want here... */}
            <SaveButton />
            {/* <Widget src="efiz.near/widget/Tree" /> */}
          </div>
        }
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
