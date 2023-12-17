import { jsx, jsxs } from "react/jsx-runtime";
import classNames from "classnames";
import { useRef } from "react";
import { useTransform } from "../../hooks/useTransform.mjs";
import { Vec2d } from "../../primitives/Vec2d.mjs";
import { clamp } from "../../primitives/utils.mjs";
const DefaultCollaboratorHint = ({
  className,
  zoom,
  point,
  color,
  viewport,
  opacity = 1
}) => {
  const rSvg = useRef(null);
  useTransform(
    rSvg,
    clamp(point.x, viewport.minX + 5 / zoom, viewport.maxX - 5 / zoom),
    clamp(point.y, viewport.minY + 5 / zoom, viewport.maxY - 5 / zoom),
    1 / zoom,
    Vec2d.Angle(viewport.center, point)
  );
  return /* @__PURE__ */ jsxs("svg", { ref: rSvg, className: classNames("tl-overlays__item", className), children: [
    /* @__PURE__ */ jsx("use", { href: "#cursor_hint", color, strokeWidth: 3, stroke: "var(--color-background)" }),
    /* @__PURE__ */ jsx("use", { href: "#cursor_hint", color, opacity })
  ] });
};
export {
  DefaultCollaboratorHint
};
//# sourceMappingURL=DefaultCollaboratorHint.mjs.map
