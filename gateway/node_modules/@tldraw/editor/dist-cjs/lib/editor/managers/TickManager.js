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
var TickManager_exports = {};
__export(TickManager_exports, {
  TickManager: () => TickManager
});
module.exports = __toCommonJS(TickManager_exports);
var import_Vec2d = require("../../primitives/Vec2d");
class TickManager {
  constructor(editor) {
    this.editor = editor;
    this.editor.disposables.add(this.dispose);
    this.start();
  }
  raf;
  isPaused = true;
  last = 0;
  t = 0;
  start = () => {
    this.isPaused = false;
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.tick);
    this.last = Date.now();
  };
  tick = () => {
    if (this.isPaused) {
      return;
    }
    const now = Date.now();
    const elapsed = now - this.last;
    this.last = now;
    this.t += elapsed;
    this.editor.emit("frame", elapsed);
    if (this.t < 16) {
      this.raf = requestAnimationFrame(this.tick);
      return;
    }
    this.t -= 16;
    this.updatePointerVelocity(elapsed);
    this.editor.emit("tick", elapsed);
    this.raf = requestAnimationFrame(this.tick);
  };
  // Clear the listener
  dispose = () => {
    this.isPaused = true;
    cancelAnimationFrame(this.raf);
  };
  prevPoint = new import_Vec2d.Vec2d();
  updatePointerVelocity = (elapsed) => {
    const {
      prevPoint,
      editor: {
        inputs: { currentScreenPoint, pointerVelocity }
      }
    } = this;
    if (elapsed === 0)
      return;
    const delta = import_Vec2d.Vec2d.Sub(currentScreenPoint, prevPoint);
    this.prevPoint = currentScreenPoint.clone();
    const length = delta.len();
    const direction = length ? delta.div(length) : new import_Vec2d.Vec2d(0, 0);
    const next = pointerVelocity.clone().lrp(direction.mul(length / elapsed), 0.5);
    if (Math.abs(next.x) < 0.01)
      next.x = 0;
    if (Math.abs(next.y) < 0.01)
      next.y = 0;
    if (!pointerVelocity.equals(next)) {
      this.editor.inputs.pointerVelocity = next;
    }
  };
}
//# sourceMappingURL=TickManager.js.map
