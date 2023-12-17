"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var arrowheads_exports = {};
__export(arrowheads_exports, {
  getArrowhead: () => getArrowhead,
  getArrowheadPathForType: () => getArrowheadPathForType,
  getBarHead: () => getBarHead,
  getDiamondHead: () => getDiamondHead,
  getDotHead: () => getDotHead,
  getInvertedTriangleHead: () => getInvertedTriangleHead,
  getPipeHead: () => getPipeHead,
  getSquareHead: () => getSquareHead,
  getTriangleHead: () => getTriangleHead
});
module.exports = __toCommonJS(arrowheads_exports);
var import_Vec2d = require("../../../../primitives/Vec2d");
var import_intersect = require("../../../../primitives/intersect");
var import_utils = require("../../../../primitives/utils");
function getArrowPoints(info, side, strokeWidth) {
  const PT = side === "end" ? info.end.point : info.start.point;
  const PB = side === "end" ? info.start.point : info.end.point;
  const compareLength = info.isStraight ? import_Vec2d.Vec2d.Dist(PB, PT) : Math.abs(info.bodyArc.length);
  const length = Math.max(Math.min(compareLength / 5, strokeWidth * 3), strokeWidth);
  let P0;
  if (info.isStraight) {
    P0 = import_Vec2d.Vec2d.Nudge(PT, PB, length);
  } else {
    const ints = (0, import_intersect.intersectCircleCircle)(PT, length, info.handleArc.center, info.handleArc.radius);
    P0 = side === "end" ? info.handleArc.sweepFlag ? ints[0] : ints[1] : info.handleArc.sweepFlag ? ints[1] : ints[0];
  }
  return {
    point: PT,
    int: P0
  };
}
function getArrowhead({ point, int }) {
  const PL = import_Vec2d.Vec2d.RotWith(int, point, import_utils.PI / 6);
  const PR = import_Vec2d.Vec2d.RotWith(int, point, -import_utils.PI / 6);
  return `M ${PL.x} ${PL.y} L ${point.x} ${point.y} L ${PR.x} ${PR.y}`;
}
function getTriangleHead({ point, int }) {
  const PL = import_Vec2d.Vec2d.RotWith(int, point, import_utils.PI / 6);
  const PR = import_Vec2d.Vec2d.RotWith(int, point, -import_utils.PI / 6);
  return `M ${PL.x} ${PL.y} L ${point.x} ${point.y} L ${PR.x} ${PR.y} Z`;
}
function getInvertedTriangleHead({ point, int }) {
  const d = import_Vec2d.Vec2d.Sub(int, point).div(2);
  const PL = import_Vec2d.Vec2d.Add(point, import_Vec2d.Vec2d.Rot(d, import_utils.TAU));
  const PR = import_Vec2d.Vec2d.Sub(point, import_Vec2d.Vec2d.Rot(d, import_utils.TAU));
  return `M ${PL.x} ${PL.y} L ${int.x} ${int.y} L ${PR.x} ${PR.y} Z`;
}
function getDotHead({ point, int }) {
  const A = import_Vec2d.Vec2d.Lrp(point, int, 0.45);
  const r = import_Vec2d.Vec2d.Dist(A, point);
  return `M ${A.x - r},${A.y}
  a ${r},${r} 0 1,0 ${r * 2},0
  a ${r},${r} 0 1,0 -${r * 2},0 `;
}
function getDiamondHead({ point, int }) {
  const PB = import_Vec2d.Vec2d.Lrp(point, int, 0.75);
  const PL = import_Vec2d.Vec2d.RotWith(PB, point, import_utils.PI / 4);
  const PR = import_Vec2d.Vec2d.RotWith(PB, point, -import_utils.PI / 4);
  const PQ = import_Vec2d.Vec2d.Lrp(PL, PR, 0.5);
  PQ.add(import_Vec2d.Vec2d.Sub(PQ, point));
  return `M ${PQ.x} ${PQ.y} L ${PL.x} ${PL.y} ${point.x} ${point.y} L ${PR.x} ${PR.y} Z`;
}
function getSquareHead({ int, point }) {
  const PB = import_Vec2d.Vec2d.Lrp(point, int, 0.85);
  const d = import_Vec2d.Vec2d.Sub(PB, point).div(2);
  const PL1 = import_Vec2d.Vec2d.Add(point, import_Vec2d.Vec2d.Rot(d, import_utils.TAU));
  const PR1 = import_Vec2d.Vec2d.Sub(point, import_Vec2d.Vec2d.Rot(d, import_utils.TAU));
  const PL2 = import_Vec2d.Vec2d.Add(PB, import_Vec2d.Vec2d.Rot(d, import_utils.TAU));
  const PR2 = import_Vec2d.Vec2d.Sub(PB, import_Vec2d.Vec2d.Rot(d, import_utils.TAU));
  return `M ${PL1.x} ${PL1.y} L ${PL2.x} ${PL2.y} L ${PR2.x} ${PR2.y} L ${PR1.x} ${PR1.y} Z`;
}
function getBarHead({ int, point }) {
  const d = import_Vec2d.Vec2d.Sub(int, point).div(2);
  const PL = import_Vec2d.Vec2d.Add(point, import_Vec2d.Vec2d.Rot(d, import_utils.TAU));
  const PR = import_Vec2d.Vec2d.Sub(point, import_Vec2d.Vec2d.Rot(d, import_utils.TAU));
  return `M ${PL.x} ${PL.y} L ${PR.x} ${PR.y}`;
}
function getPipeHead() {
  return "";
}
function getArrowheadPathForType(info, side, strokeWidth) {
  const type = side === "end" ? info.end.arrowhead : info.start.arrowhead;
  if (type === "none")
    return;
  const points = getArrowPoints(info, side, strokeWidth);
  if (!points)
    return;
  switch (type) {
    case "bar":
      return getBarHead(points);
    case "square":
      return getSquareHead(points);
    case "diamond":
      return getDiamondHead(points);
    case "dot":
      return getDotHead(points);
    case "inverted":
      return getInvertedTriangleHead(points);
    case "arrow":
      return getArrowhead(points);
    case "triangle":
      return getTriangleHead(points);
  }
  return "";
}
//# sourceMappingURL=arrowheads.js.map
