import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import { memo, useRef } from "react";
import { useTransform } from "../../hooks/useTransform.mjs";
const _Cursor = ({ className, zoom, point, color, name, chatMessage }) => {
  const rCursor = useRef(null);
  useTransform(rCursor, point?.x, point?.y, 1 / zoom);
  if (!point)
    return null;
  return /* @__PURE__ */ jsxs("div", { ref: rCursor, className: classNames("tl-overlays__item", className), children: [
    /* @__PURE__ */ jsx("svg", { className: "tl-cursor", children: /* @__PURE__ */ jsx("use", { href: "#cursor", color }) }),
    chatMessage ? /* @__PURE__ */ jsxs(Fragment, { children: [
      name && /* @__PURE__ */ jsx("div", { className: "tl-nametag-title", style: { color }, children: name }),
      /* @__PURE__ */ jsx("div", { className: "tl-nametag-chat", style: { backgroundColor: color }, children: chatMessage })
    ] }) : name && /* @__PURE__ */ jsx("div", { className: "tl-nametag", style: { backgroundColor: color }, children: name })
  ] });
};
const DefaultCursor = memo(_Cursor);
export {
  DefaultCursor
};
//# sourceMappingURL=DefaultCursor.mjs.map
