import { Tldraw, createTLStore, defaultShapeUtils } from "@tldraw/tldraw";
import React, { useCallback, useEffect, useState } from "react";
import { ActionButton } from "../../ActionButton";
import { ResponseShapeUtil } from "./ResponseShape";
import ShareZone from "./ShareZone";
import { TldrawLogo } from "./TldrawLogo";
import { ThingShapeUtil } from "./ThingShape";

const shapeUtils = [ResponseShapeUtil, ThingShapeUtil];

function EverythingCanvas({
  persistenceKey,
  autoFocus,
  hideUi,
  initialSnapshot,
  plugins, // we could replace showAction, pass plugins to action button
}) {
  const [editor, setEditor] = useState(null);
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
    setEditor(editor);
    // Do something
    // Once the canvas mounts
    // Can we set widget on top of canvas

    // this could be for creating/updating shapes from Social.index
  }, []);

  useEffect(() => {
    if (!editor) return;

    // This is the fire hose, it will be called at the end of every transaction
    const handleChangeEvent = (change) => {
      if (change.source === "user") {
        // Added
        for (const record of Object.values(change.changes.added)) {
          if (record.typeName === "shape") {
            console.log(`created shape (${record.type})`);
          }
        }

        // Updated
        for (const [from, to] of Object.values(change.changes.updated)) {
          if (
            from.typeName === "instance" &&
            to.typeName === "instance" &&
            from.currentPageId !== to.currentPageId
          ) {
            console.log(
              `changed page (${from.currentPageId}, ${to.currentPageId})`
            );
          }
        }

        // Removed
        for (const record of Object.values(change.changes.removed)) {
          if (record.typeName === "shape") {
            console.log(`deleted shape (${record.type})`);
          }
        }
      }
    };

    editor.on("change", handleChangeEvent);

    return () => {
      editor.off("change", handleChangeEvent);
    };
  }, [editor]);

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
        <ActionButton plugins={plugins} />
        <TldrawLogo />
      </Tldraw>
    </div>
  );
}

export default EverythingCanvas;
