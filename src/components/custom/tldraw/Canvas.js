
import { useEditor } from "@tldraw/editor";
import {
  AssetRecordType,
  Tldraw,
  createTLStore,
  defaultShapeUtils,
} from "@tldraw/tldraw";
import { Widget } from "near-social-vm";
import { default as React, useCallback, useState } from "react";
import styled from "styled-components";
import { useUrlState } from "../../../hooks/useUrlState";
=======
import { Tldraw, createTLStore, defaultShapeUtils } from "@tldraw/tldraw";
import { useEditor, useValue } from "@tldraw/editor";
import { MAX_ZOOM, MIN_ZOOM } from "@tldraw/tldraw";
import React, { useCallback, useEffect, useState } from "react";
>>>>>>> 330d8947 ([REFACTOR] Templates UI)
import { ActionButton } from "../../ActionButton";
import { ResponseShapeUtil } from "./ResponseShape";
import SharePanel from "./SharePanel";
import { TldrawLogo } from "./TldrawLogo";
import TopZone from "./TopZone";
<<<<<<< HEAD
import { ZoomIn } from "./ZoomUI";
=======
import styled from "styled-components";
import { useAccountId } from "near-social-vm";
import { useHistory, useLocation } from "react-router-dom";
import { Templates } from "./Templates";
>>>>>>> 330d8947 ([REFACTOR] Templates UI)

const shapeUtils = [ResponseShapeUtil];

export function UrlStateSync() {
  const syncViewport = useCallback((params) => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + `?v=${params.v}&p=${params.p}`
    );
  }, []);
  useUrlState(syncViewport);

  return null;
}

<<<<<<< HEAD
const DropdownContent = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #bcbbbf;
  padding: 0.5rem;
  display: flex;
  border-radius: 13px;
  gap: 0.5rem;
  margin-bottom: 1rem;
  img {
    border-radius: 13px;
    cursor: pointer;
  }

  @media (max-width: 870px) {
    right: 0;
    transform: translateX(25%);
    top: 0;
    flex-direction: column;
    width: max-content;
    height: max-content;
  }
`;

const TemplateUI = styled.div`
  position: fixed;
  left: 172px;
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
    padding: 6px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: transparent;
    font-size: 12px;
    gap: 8px;
    text-shadow: 1px 1px #fff;

    border-radius: 4px !important;

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

  @media (max-width: 870px) {
    top: 50px;
    left: 0;
    margin-left: 0.25rem;
    height: max-content;
    border-radius: 8px;
  }
`;
=======
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
>>>>>>> 330d8947 ([REFACTOR] Templates UI)

function TldrawCanvas({
  persistance,
  autoFocus = true,
  hideUi = false,
  isReadOnly = false,
  initialSnapshot,
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

  const handleMount = useCallback(
    (editor) => {
      window.app = editor;
      window.editor = editor;
      editor.updateInstanceState({ isReadonly: isReadOnly });
      // editor.user.updateUserPreferences({
      //   id: accountId,
      // });
      // editor.getInitialMetaForShape = (_shape) => {
      //   return {
      //     createdBy: editor.user.getId(),
      //     createdAt: Date.now(),
      //     updatedBy: editor.user.getId(),
      //     updatedAt: Date.now(),
      //   };
      // };
      // editor.registerExternalAssetHandler("file", createAssetFromFile);
      // editor.registerExternalAssetHandler("url", createAssetFromUrl);
    },
    [isReadOnly]
  );

  function loadComponents(c = {}) {
    return Object.keys(c).reduce((acc, key) => {
      if (!c[key]) {
        acc[key] = null;
      } else {
        if (typeof c[key] === "function") {
          acc[key] = c[key];
        } else {
          const plugin = c[key];
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
      }
      return acc;
    }, {});
  }

  return (
    <div className={"tldraw__editor"}>
      <Tldraw
        persistenceKey={persistance || "everyone"}
        autoFocus={autoFocus}
        hideUi={hideUi}
        store={store}
        shapeUtils={shapeUtils}
        onMount={handleMount}
        initialState={isReadOnly ? "hand" : "select"}
        components={loadComponents({
          // props.components
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
        })}
      >
        <ActionButton path={persistance} />
        <TldrawLogo />
        <ZoomIn />
<<<<<<< HEAD
        <TemplateUI>
          <div className="position-relative">
            <button
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <i className="bi bi-easel"></i>
            </button>
            {dropdown && (
              <DropdownContent>
                <TemplateDropdown />
              </DropdownContent>
            )}
          </div>
        </TemplateUI>
        <UrlStateSync />
=======
        <Templates />
        <Test />
>>>>>>> 330d8947 ([REFACTOR] Templates UI)
      </Tldraw>
    </div>
  );
}

export default TldrawCanvas;
