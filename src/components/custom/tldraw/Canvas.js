import {
  OfflineIndicator,
  Tldraw,
  createTLStore,
  defaultShapeUtils,
} from "@tldraw/tldraw";
import React, { useCallback, useState } from "react";
import { ActionButton } from "../../ActionButton";
import { ResponseShapeUtil } from "./ResponseShape";
import ShareZone from "./ShareZone";
import { TldrawLogo } from "./TldrawLogo";
import TopZone from "./TopZone";

const shapeUtils = [ResponseShapeUtil];

function EverythingCanvas({
  persistance,
  autoFocus,
  hideUi,
  initialSnapshot,
  plugins, // we could replace showAction, pass plugins to action button
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
        persistenceKey={persistance || "everyone"}
        shapeUtils={shapeUtils}
        topZone={
          <div className={"tldraw__topZone"}>
            <TopZone path={persistance} />
          </div>
        }
        shareZone={
          <div className={"tldraw__shareZone"}>
            <ShareZone path={persistance} />
          </div>
        }
        store={store}
        onMount={setAppToState}
        autoFocus={autoFocus ?? true}
        hideUi={hideUi ?? false}
      >
        <ActionButton plugins={plugins} />
        <TldrawLogo />
      </Tldraw>
    </div>
  );
}

export default EverythingCanvas;
