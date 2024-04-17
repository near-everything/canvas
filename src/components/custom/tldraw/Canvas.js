import { Tldraw, createTLStore, defaultShapeUtils } from "@tldraw/tldraw";
import { useEditor, useValue } from "@tldraw/editor";
import { MAX_ZOOM, MIN_ZOOM } from "@tldraw/tldraw";
import React, { useCallback, useEffect, useState } from "react";
import { ActionButton } from "../../ActionButton";
import { ResponseShapeUtil } from "./ResponseShape";
import SharePanel from "./SharePanel";
import { TldrawLogo } from "./TldrawLogo";
import TopZone from "./TopZone";
import styled from "styled-components";
import { useAccountId } from "near-social-vm";
import { useHistory, useLocation } from "react-router-dom";

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

const Test = () => {
  const editor = useEditor();
  const location = useLocation();
  const history = useHistory();
  const accountId = useAccountId();

  const currentPage = useValue("currentPage", () => editor.getCurrentPage(), [
    editor,
  ]);
  const viewportPageBounds = useValue(
    "viewportPageBounds",
    () => editor.getViewportPageBounds(),
    [editor]
  );

  useEffect(() => {
    const updatePage = setTimeout(() => {
      const newLocation = {
        pathname:
          location.pathname === "/" || location.pathname === "/null"
            ? location.pathname === "/"
              ? `/${accountId}`
              : "/every.near"
            : location.pathname,

        search: `page=${currentPage.name
          .toLowerCase()
          .split(" ")
          .join("-")}&v=${viewportPageBounds.x.toFixed(
          2
        )},${viewportPageBounds.y.toFixed(2)},${viewportPageBounds.w},${
          viewportPageBounds.h
        }`,
      };

      history.push(newLocation);
    }, 1000);

    return () => clearTimeout(updatePage);
  }, [currentPage, viewportPageBounds]);

  return <></>;
};

function TldrawCanvas({
  page,
  persistance,
  autoFocus,
  viewport,
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

      if (viewport) {
        const [x, y, w, h] = viewport.split(",");
        const { w: sw, h: sh } = editor.getViewportScreenBounds();

        const zoom = Math.min(
          Math.max(Math.min(sw / w, sh / h), MIN_ZOOM),
          MAX_ZOOM
        );

        editor.setCamera({
          x: -x + (sw - w * zoom) / 2 / zoom,
          y: -y + (sh - h * zoom) / 2 / zoom,
          z: zoom,
        });
      }
    },
    [creatorId]
  );

  function loadComponents(c = {}) {
    return Object.keys(c).reduce((acc, key) => {
      if (!c[key]) {
        acc[key] = null;
      } else {
        const { src, props } = c[key];
        acc[key] = () => (
          <div
            key={key}
            className={`tldraw__${key}`}
            style={{ pointerEvents: "all", display: "flex" }}
          >
            <Widget
              src={plugin.src}
              props={{ ...plugin.props, color, name, id }}
            />
          </div>
        );
      }
      return acc;
    }, {});
  }

  return (
    <div className={"tldraw__editor"}>
      <Tldraw
        persistenceKey={persistance || "everyone"}
        shapeUtils={shapeUtils}
        // loadComponents(props.components)
        components={{
          TopPanel: () => (
            <div
              key={"TopPanel"}
              className="tldraw__TopPanel"
              style={{ pointerEvents: "all", display: "flex" }}
            >
              <TopZone path={persistance} />
            </div>
          ),
          SharePanel: () => (
            <div
              key={"SharePanel"}
              className="tldraw__SharePanel"
              style={{ pointerEvents: "all", display: "flex" }}
            >
              <SharePanel path={persistance} />
            </div>
          ),
        }}
        store={store}
        onMount={setAppToState}
        autoFocus={autoFocus ?? true}
        hideUi={hideUi ?? false}
      >
        <ActionButton path={persistance} />
        <TldrawLogo />
        <ZoomIn />
        <Test />
      </Tldraw>
    </div>
  );
}

export default TldrawCanvas;
