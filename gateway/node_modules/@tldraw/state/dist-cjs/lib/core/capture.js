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
var capture_exports = {};
__export(capture_exports, {
  maybeCaptureParent: () => maybeCaptureParent,
  startCapturingParents: () => startCapturingParents,
  stopCapturingParents: () => stopCapturingParents,
  unsafe__withoutCapture: () => unsafe__withoutCapture,
  whyAmIRunning: () => whyAmIRunning
});
module.exports = __toCommonJS(capture_exports);
var import_helpers = require("./helpers");
const tldrawStateGlobalKey = Symbol.for("__@tldraw/state__");
const tldrawStateGlobal = globalThis;
if (tldrawStateGlobal[tldrawStateGlobalKey]) {
  console.error(
    'Multiple versions of @tldraw/state detected. This will cause unexpected behavior. Please add "resolutions" (yarn/pnpm) or "overrides" (npm) in your package.json to ensure only one version of @tldraw/state is loaded.'
  );
} else {
  tldrawStateGlobal[tldrawStateGlobalKey] = true;
}
class CaptureStackFrame {
  constructor(below, child) {
    this.below = below;
    this.child = child;
  }
  offset = 0;
  numNewParents = 0;
  maybeRemoved;
}
let stack = null;
function unsafe__withoutCapture(fn) {
  const oldStack = stack;
  stack = null;
  try {
    return fn();
  } finally {
    stack = oldStack;
  }
}
function startCapturingParents(child) {
  stack = new CaptureStackFrame(stack, child);
}
function stopCapturingParents() {
  const frame = stack;
  stack = frame.below;
  const didParentsChange = frame.numNewParents > 0 || frame.offset !== frame.child.parents.length;
  if (!didParentsChange) {
    return;
  }
  for (let i = frame.offset; i < frame.child.parents.length; i++) {
    const p = frame.child.parents[i];
    const parentWasRemoved = frame.child.parents.indexOf(p) >= frame.offset;
    if (parentWasRemoved) {
      (0, import_helpers.detach)(p, frame.child);
    }
  }
  frame.child.parents.length = frame.offset;
  frame.child.parentEpochs.length = frame.offset;
  if (stack?.maybeRemoved) {
    for (let i = 0; i < stack.maybeRemoved.length; i++) {
      const maybeRemovedParent = stack.maybeRemoved[i];
      if (frame.child.parents.indexOf(maybeRemovedParent) === -1) {
        (0, import_helpers.detach)(maybeRemovedParent, frame.child);
      }
    }
  }
}
function maybeCaptureParent(p) {
  if (stack) {
    const idx = stack.child.parents.indexOf(p);
    if (idx < 0) {
      stack.numNewParents++;
      if (stack.child.isActivelyListening) {
        (0, import_helpers.attach)(p, stack.child);
      }
    }
    if (idx < 0 || idx >= stack.offset) {
      if (idx !== stack.offset && idx > 0) {
        const maybeRemovedParent = stack.child.parents[stack.offset];
        if (!stack.maybeRemoved) {
          stack.maybeRemoved = [maybeRemovedParent];
        } else if (stack.maybeRemoved.indexOf(maybeRemovedParent) === -1) {
          stack.maybeRemoved.push(maybeRemovedParent);
        }
      }
      stack.child.parents[stack.offset] = p;
      stack.child.parentEpochs[stack.offset] = p.lastChangedEpoch;
      stack.offset++;
    }
  }
}
function whyAmIRunning() {
  const child = stack?.child;
  if (!child) {
    throw new Error("whyAmIRunning() called outside of a reactive context");
  }
  const changedParents = [];
  for (let i = 0; i < child.parents.length; i++) {
    const parent = child.parents[i];
    if (parent.lastChangedEpoch > child.parentEpochs[i]) {
      changedParents.push(parent);
    }
  }
  if (changedParents.length === 0) {
    console.log(child.name, "is running but none of the parents changed");
  } else {
    console.log(child.name, "is running because:");
    for (const changedParent of changedParents) {
      console.log(
        "	",
        changedParent.name,
        "changed =>",
        changedParent.__unsafe__getWithoutCapture()
      );
    }
  }
}
//# sourceMappingURL=capture.js.map
