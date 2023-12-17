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
var DragAndDropManager_exports = {};
__export(DragAndDropManager_exports, {
  DragAndDropManager: () => DragAndDropManager
});
module.exports = __toCommonJS(DragAndDropManager_exports);
var import_editor = require("@tldraw/editor");
const LAG_DURATION = 100;
class DragAndDropManager {
  constructor(editor) {
    this.editor = editor;
    editor.disposables.add(this.dispose);
  }
  prevDroppingShapeId = null;
  droppingNodeTimer = null;
  first = true;
  updateDroppingNode(movingShapes, cb) {
    if (this.first) {
      this.prevDroppingShapeId = this.editor.getDroppingOverShape(this.editor.inputs.originPagePoint, movingShapes)?.id ?? null;
      this.first = false;
    }
    if (this.droppingNodeTimer === null) {
      this.setDragTimer(movingShapes, LAG_DURATION * 10, cb);
    } else if (this.editor.inputs.pointerVelocity.len() > 0.5) {
      clearInterval(this.droppingNodeTimer);
      this.setDragTimer(movingShapes, LAG_DURATION, cb);
    }
  }
  setDragTimer(movingShapes, duration, cb) {
    this.droppingNodeTimer = setTimeout(() => {
      this.editor.batch(() => {
        this.handleDrag(this.editor.inputs.currentPagePoint, movingShapes, cb);
      });
      this.droppingNodeTimer = null;
    }, duration);
  }
  handleDrag(point, movingShapes, cb) {
    movingShapes = (0, import_editor.compact)(movingShapes.map((shape) => this.editor.getShape(shape.id)));
    const nextDroppingShapeId = this.editor.getDroppingOverShape(point, movingShapes)?.id ?? null;
    if (nextDroppingShapeId === this.prevDroppingShapeId) {
      return;
    }
    const { prevDroppingShapeId } = this;
    const prevDroppingShape = prevDroppingShapeId && this.editor.getShape(prevDroppingShapeId);
    const nextDroppingShape = nextDroppingShapeId && this.editor.getShape(nextDroppingShapeId);
    if (prevDroppingShape) {
      this.editor.getShapeUtil(prevDroppingShape).onDragShapesOut?.(prevDroppingShape, movingShapes);
    }
    if (nextDroppingShape) {
      const res = this.editor.getShapeUtil(nextDroppingShape).onDragShapesOver?.(nextDroppingShape, movingShapes);
      if (res && res.shouldHint) {
        this.editor.setHintingShapes([nextDroppingShape.id]);
      }
    } else {
      this.editor.setHintingShapes([]);
    }
    cb?.();
    this.prevDroppingShapeId = nextDroppingShapeId;
  }
  dropShapes(shapes) {
    const { prevDroppingShapeId } = this;
    this.handleDrag(this.editor.inputs.currentPagePoint, shapes);
    if (prevDroppingShapeId) {
      const shape = this.editor.getShape(prevDroppingShapeId);
      if (!shape)
        return;
      this.editor.getShapeUtil(shape).onDropShapesOver?.(shape, shapes);
    }
  }
  clear() {
    this.prevDroppingShapeId = null;
    if (this.droppingNodeTimer !== null) {
      clearInterval(this.droppingNodeTimer);
    }
    this.droppingNodeTimer = null;
    this.editor.setHintingShapes([]);
    this.first = true;
  }
  dispose = () => {
    this.clear();
  };
}
//# sourceMappingURL=DragAndDropManager.js.map
