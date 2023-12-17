import { perimeterOfEllipse } from "@tldraw/editor";
function getOvalSolidPath(w, h) {
  if (h > w) {
    const offset2 = w / 2;
    return `
    M0,${offset2}
    a${offset2},${offset2},0,1,1,${offset2 * 2},0
    L${w},${h - offset2}
    a${offset2},${offset2},0,1,1,-${offset2 * 2},0
    Z`;
  }
  const offset = h / 2;
  return `
    M${offset},0
    L${w - offset},0
    a${offset},${offset},0,1,1,0,${offset * 2}
    L${offset},${h}
    a${offset},${offset},0,1,1,0,${-offset * 2}
    Z`;
}
function getOvalPerimeter(h, w) {
  if (h > w) {
    const offset2 = w / 2;
    return perimeterOfEllipse(offset2, offset2) + (h - offset2 * 2) * 2;
  }
  const offset = h / 2;
  return perimeterOfEllipse(offset, offset) + (w - offset * 2) * 2;
}
export {
  getOvalPerimeter,
  getOvalSolidPath
};
//# sourceMappingURL=helpers.mjs.map
