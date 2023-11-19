import { Tldraw, createTLStore, defaultShapeUtils } from "@tldraw/tldraw";
import React, { useCallback, useState } from "react";
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
  plugins, // we could replace showAction, pass plugins to action button
  showAction,
}) {
  const [store] = useState(() => {
    if (initialSnapshot) {
      const newStore = createTLStore({
        shapeUtils: defaultShapeUtils.concat(shapeUtils),
      });

      newStore.loadSnapshot(initialSnapshot);

      return newStore;
    }
  });

  const setAppToState = useCallback((editor) => {
    // Do something

    // Once the canvas mounts

    // Can we set widget on top of canvas

  }, []);

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
        store={store}
        onMount={setAppToState}
        autoFocus={autoFocus ?? true}
        hideUi={hideUi ?? false}
      >
        {showAction && <ActionButton />}
        <TldrawLogo />
      </Tldraw>
    </div>
  );
}

export default EverythingCanvas;
