import { jsx, jsxs } from "react/jsx-runtime";
import classNames from "classnames";
const DefaultHandle = ({ handle, isCoarse, className, zoom }) => {
  const bgRadius = (isCoarse ? 20 : 12) / zoom;
  const fgRadius = (handle.type === "create" && isCoarse ? 3 : 4) / zoom;
  return /* @__PURE__ */ jsxs(
    "g",
    {
      className: classNames(
        "tl-handle",
        {
          "tl-handle__virtual": handle.type === "virtual",
          "tl-handle__create": handle.type === "create"
        },
        className
      ),
      children: [
        /* @__PURE__ */ jsx("circle", { className: "tl-handle__bg", r: bgRadius }),
        /* @__PURE__ */ jsx("circle", { className: "tl-handle__fg", r: fgRadius })
      ]
    }
  );
};
export {
  DefaultHandle
};
//# sourceMappingURL=DefaultHandle.mjs.map
