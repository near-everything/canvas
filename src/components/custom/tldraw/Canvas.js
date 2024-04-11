import {
  OfflineIndicator,
  Tldraw,
  createTLStore,
  defaultShapeUtils,
} from "@tldraw/tldraw";
import { useEditor } from "@tldraw/editor";
import React, { useCallback, useState } from "react";
import { ActionButton } from "../../ActionButton";
import { ResponseShapeUtil } from "./ResponseShape";
import ShareZone from "./ShareZone";
import { TldrawLogo } from "./TldrawLogo";
import TopZone from "./TopZone";
import styled from "styled-components";

const shapeUtils = [ResponseShapeUtil];

const ZoomUI = styled.div`
  position: fixed;
  left: 100px;
  bottom: 0;
  z-index: 599;
  pointer-events: all;
  display: flex;
  flex-direction: row;
  background: hsl(204, 16%, 94%);
  gap: 0.5rem;
  padding: 5px;
  border-radius: 13px 13px 0 0;
  border: 4px solid rgb(249, 250, 251);
  border-bottom: 0;
  button {
    color: #2d2d2d;
    border: none !important;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: transparent;
    font-size: 12px;
    gap: 8px;
    text-shadow: 1px 1px #fff;

    border-radius: 8px !important;

    &:active {
      border-style: inset;
      background-color: #d5d5d5;
      color: #000;
    }

    &:hover {
      background-color: #e5e5e5 !important;
      color: #111 !important;
    }
  }

  @media (max-width: 840px) {
    left: 55px;
  }
  @media (max-width: 690px) {
    display: none;
  }
`;

const ZoomIn = () => {
  const editor = useEditor();

  return (
    <ZoomUI>
      <button
        onClick={() => {
          editor.zoomIn();
        }}
      >
        <i className="bi bi-plus-lg"></i>
      </button>
      <button
        onClick={() => {
          editor.zoomOut();
        }}
      >
        <i className="bi bi-dash"></i>
      </button>
    </ZoomUI>
  );
};

function TldrawCanvas({
  page,
  persistance,
  autoFocus,
  hideUi,
  initialSnapshot,
}) {
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

      if (page) {
        const pages = editor.getPages().map((item) => {
          return {
            id: item.id,
            name: item.name.toLowerCase().split(" ").join("-"),
          };
        });
        const selectedPage = pages.find((item) => item.name === page);
        if (selectedPage) {
          editor.setCurrentPage(selectedPage.id);
        }
      }

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
        <ZoomIn />
      </Tldraw>
    </div>
  );
}

export default TldrawCanvas;
