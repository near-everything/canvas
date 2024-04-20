import { useEditor, useValue } from "@tldraw/editor";
import {
  AssetRecordType,
  Tldraw,
  createTLStore,
  defaultShapeUtils,
} from "@tldraw/tldraw";
import { default as React, useCallback, useEffect, useState } from "react";
import { useUrlState } from "../../../hooks/useUrlState";
import { ActionButton } from "../../ActionButton";
import { ResponseShapeUtil } from "./ResponseShape";
import SharePanel from "./SharePanel";
import { TldrawLogo } from "./TldrawLogo";
import TopZone from "./TopZone";
import { ZoomIn } from "./ZoomUI";
import styled from "styled-components";
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import { Widget, useAccountId } from "near-social-vm";

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

  // const setAppToState = useCallback(
  //   (editor) => {
  //     editor.user.updateUserPreferences({
  //       id: creatorId,
  //     });

  //     editor.getInitialMetaForShape = (_shape) => {
  //       return {
  //         createdBy: editor.user.getId(),
  //         createdAt: Date.now(),
  //         updatedBy: editor.user.getId(),
  //         updatedAt: Date.now(),
  //       };
  //     };

  //     if (page) {
  //       const pages = editor.getPages().map((item) => {
  //         return {
  //           id: item.id,
  //           name: item.name.toLowerCase().split(" ").join("-"),
  //         };
  //       });
  //       const selectedPage = pages.find((item) => item.name === page);
  //       if (selectedPage) {
  //         editor.setCurrentPage(selectedPage.id);
  //       }
  //     }

  //     if (viewport) {
  //       const [x, y, w, h] = viewport.split(",");
  //       const { w: sw, h: sh } = editor.getViewportScreenBounds();

  //       const zoom = Math.min(
  //         Math.max(Math.min(sw / w, sh / h), MIN_ZOOM),
  //         MAX_ZOOM
  //       );

  //       editor.setCamera({
  //         x: -x + (sw - w * zoom) / 2 / zoom,
  //         y: -y + (sh - h * zoom) / 2 / zoom,
  //         z: zoom,
  //       });
  //     }
  //   },
  //   [creatorId]
  // );

  const handleMount = useCallback(
    (editor) => {
      window.app = editor;
      window.editor = editor;
      editor.updateInstanceState({ isReadonly: isReadOnly });
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

  const [dropdown, setDropdown] = useState(false);
  const TemplateDropdown = () => {
    const templates = [
      {
        src: "https://i.pinimg.com/736x/17/60/1e/17601e367e1689524f531c775c80d497.jpg",
        type: "jpg",
        width: 736,
        height: 952,
      },
      {
        src: "https://png.pngtree.com/template/20210809/ourmid/pngtree-cute-simple-note-template-design-image_561822.jpg",
        type: "jpg",
        width: 328,
        height: 405,
      },
    ];
    const editor = useEditor();
    const handleImageClick = (imageUrl, imageType, imageHeight, imageWidth) => {
      const assetId = AssetRecordType.createId();
      //[2]
      editor.createAssets([
        {
          id: assetId,
          type: "image",
          typeName: "asset",
          props: {
            name: imageUrl,
            src: imageUrl, // You could also use a base64 encoded string here
            w: imageWidth,
            h: imageHeight,
            mimeType: `image/${imageType}`,
            isAnimated: false,
          },
          meta: {},
        },
      ]);
      //[3]
      editor.createShape({
        type: "image",
        // Let's center the image in the editor
        x: (window.innerWidth - imageWidth) / 2,
        y: (window.innerHeight - imageHeight) / 2,
        props: {
          assetId,
          w: imageWidth,
          h: imageHeight,
        },
      });
    };
    return (
      <>
        {templates.map((item) => (
          <div
            key={item.src}
            onClick={() => {
              handleImageClick(item.src, item.type, item.height, item.width);
              setDropdown(!dropdown);
            }}
          >
            <img
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
              src={item.src}
            />
          </div>
        ))}
      </>
    );
  };

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
        <Test />
        {/* <UrlStateSync /> */}
      </Tldraw>
    </div>
  );
}

export default TldrawCanvas;
