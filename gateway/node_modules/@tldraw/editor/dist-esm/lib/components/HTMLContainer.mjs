import { jsx } from "react/jsx-runtime";
function HTMLContainer({ children, className = "", ...rest }) {
  return /* @__PURE__ */ jsx("div", { ...rest, className: `tl-html-container ${className}`, children });
}
export {
  HTMLContainer
};
//# sourceMappingURL=HTMLContainer.mjs.map
