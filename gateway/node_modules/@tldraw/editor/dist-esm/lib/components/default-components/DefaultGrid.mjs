import { jsx, jsxs } from "react/jsx-runtime";
import { modulate } from "@tldraw/utils";
import { GRID_STEPS } from "../../constants.mjs";
const DefaultGrid = ({ x, y, z, size }) => {
  return /* @__PURE__ */ jsxs("svg", { className: "tl-grid", version: "1.1", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("defs", { children: GRID_STEPS.map(({ min, mid, step }, i) => {
      const s = step * size * z;
      const xo = 0.5 + x * z;
      const yo = 0.5 + y * z;
      const gxo = xo > 0 ? xo % s : s + xo % s;
      const gyo = yo > 0 ? yo % s : s + yo % s;
      const opacity = z < mid ? modulate(z, [min, mid], [0, 1]) : 1;
      return /* @__PURE__ */ jsx(
        "pattern",
        {
          id: `grid-${step}`,
          width: s,
          height: s,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ jsx("circle", { className: "tl-grid-dot", cx: gxo, cy: gyo, r: 1, opacity })
        },
        `grid-pattern-${i}`
      );
    }) }),
    GRID_STEPS.map(({ step }, i) => /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", fill: `url(#grid-${step})` }, `grid-rect-${i}`))
  ] });
};
export {
  DefaultGrid
};
//# sourceMappingURL=DefaultGrid.mjs.map
