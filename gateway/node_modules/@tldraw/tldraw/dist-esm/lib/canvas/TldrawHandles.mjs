import { jsx } from "react/jsx-runtime";
import { useEditor, useValue } from "@tldraw/editor";
const TldrawHandles = ({ children }) => {
  const editor = useEditor();
  const shouldDisplayHandles = useValue(
    "shouldDisplayHandles",
    () => editor.isInAny("select.idle", "select.pointing_handle"),
    [editor]
  );
  if (!shouldDisplayHandles)
    return null;
  return /* @__PURE__ */ jsx("svg", { className: "tl-user-handles tl-overlays__item", children });
};
export {
  TldrawHandles
};
//# sourceMappingURL=TldrawHandles.mjs.map
