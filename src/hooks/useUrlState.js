import { useEffect, useRef } from "react";
import { MAX_ZOOM, MIN_ZOOM, debounce, react, useEditor } from "tldraw";

const PARAMS = {
  viewport: "viewport",
  page: "page",
  v: "v",
  p: "p",
};

const viewportFromString = (str) => {
  const [x, y, w, h] = str.split(",").map((n) => parseInt(n, 10));
  return { x, y, w, h };
};

const viewportToString = ({ x, y, w, h }, precision = 0) => {
  return `${x.toFixed(precision)},${y.toFixed(precision)},${w.toFixed(
    precision
  )},${h.toFixed(precision)}`;
};

export const getViewportUrlQuery = (editor) => {
  if (!editor.getViewportPageBounds()) return null;
  return {
    [PARAMS.v]: viewportToString(editor.getViewportPageBounds()),
    [PARAMS.p]: editor.getCurrentPageId()?.split(":")[1],
  };
};

export function useUrlState(onChangeUrl) {
  const editor = useEditor();
  const onChangeUrlRef = useRef(onChangeUrl);
  onChangeUrlRef.current = onChangeUrl;

  useEffect(() => {
    if (!editor) return;

    const url = new URL(location.href);

    if (url.searchParams.has(PARAMS.page) || url.searchParams.has(PARAMS.p)) {
      const newPageId =
        url.searchParams.get(PARAMS.page) ??
        "page:" + url.searchParams.get(PARAMS.p);
      if (newPageId) {
        if (editor.store.has(newPageId)) {
          editor.setCurrentPage(newPageId);
        }
      }
    }

    if (
      url.searchParams.has(PARAMS.viewport) ||
      url.searchParams.has(PARAMS.v)
    ) {
      const newViewportRaw =
        url.searchParams.get(PARAMS.viewport) ?? url.searchParams.get(PARAMS.v);
      if (newViewportRaw) {
        try {
          const viewport = viewportFromString(newViewportRaw);
          const { x, y, w, h } = viewport;
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
        } catch (err) {
          console.error(err);
        }
      }
    }

    const handleChange = debounce((params) => {
      if (params) onChangeUrlRef.current(params);
    }, 500);

    const unsubscribe = react("urlState", () => {
      handleChange(getViewportUrlQuery(editor));
    });

    return () => {
      handleChange.cancel();
      unsubscribe();
    };
  }, [editor]);
}
