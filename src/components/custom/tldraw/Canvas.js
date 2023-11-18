import { Tldraw, useEditor } from "@tldraw/tldraw";
import React, { useCallback } from "react";
import { ActionButton } from "../../ActionButton";
import { ResponseShapeUtil } from "./ResponseShape";
import ShareZone from "./ShareZone";
import { TldrawLogo } from "./TldrawLogo";

const shapeUtils = [ResponseShapeUtil];

function EverythingCanvas({
  persistenceKey,
  autoFocus,
  hideUi,
  initialSnapshot,
  plugins,
}) {
  // const setAppToState = useCallback((editor) => {
  //   if (editor && initialSnapshot) {
  //     editor.store.loadSnapshot(initialSnapshot);
  //   }
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
        // onMount={setAppToState}
        autoFocus={autoFocus ?? true}
        hideUi={hideUi ?? false}
      >
        <ActionButton />
        <TldrawLogo />
      </Tldraw>
    </div>
  );
}

export default EverythingCanvas;
