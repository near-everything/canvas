import { jsx } from "react/jsx-runtime";
function SVGContainer({ children, className = "", ...rest }) {
  return /* @__PURE__ */ jsx("svg", { ...rest, className: `tl-svg-container ${className}`, children });
}
export {
  SVGContainer
};
//# sourceMappingURL=SVGContainer.mjs.map
