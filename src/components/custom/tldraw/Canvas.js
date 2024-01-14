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

function TldrawCanvas({ persistance, autoFocus, hideUi, initialSnapshot }) {
  const parts = persistance.split("/");
  const creatorId = parts[0];

  const [store] = useState(() => {
    if (initialSnapshot) {
      const newStore = createTLStore({
        shapeUtils: defaultShapeUtils.concat(shapeUtils),
      });

      newStore.loadSnapshot(initialSnapshot);

      return newStore;
    }
  });

  const setAppToState = useCallback(
    (editor) => {
      editor.user.updateUserPreferences({
        id: creatorId,
      });

      editor.getInitialMetaForShape = (_shape) => {
        return {
          createdBy: editor.user.getId(),
          createdAt: Date.now(),
          updatedBy: editor.user.getId(),
          updatedAt: Date.now(),
        };
      };
      // We can also use the sideEffects API to modify a shape before
      // its change is committed to the database. This will run for
      // all shapes whenever they are updated.
      // editor.sideEffects.registerBeforeChangeHandler(
      //   "shape",
      //   (record, _prev, source) => {
      //     if (source !== "user") return record;
      //     record.meta = {
      //       ...record.meta,
      //       updatedBy: editor.user.getId(),
      //       updatedAt: Date.now(),
      //     };
      //     return record;
      //   }
      // );
    },
    [creatorId]
  );

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
        <ActionButton path={persistance} />
        <TldrawLogo />
      </Tldraw>
    </div>
  );
}

export default TldrawCanvas;
