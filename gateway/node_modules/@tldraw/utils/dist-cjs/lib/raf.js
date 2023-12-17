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
var raf_exports = {};
__export(raf_exports, {
  rafThrottle: () => rafThrottle,
  throttledRaf: () => throttledRaf
});
module.exports = __toCommonJS(raf_exports);
const isTest = () => typeof process !== "undefined" && process.env.NODE_ENV === "test" && // @ts-expect-error
!globalThis.__FORCE_RAF_IN_TESTS__;
const rafQueue = [];
const tick = () => {
  const queue = rafQueue.splice(0, rafQueue.length);
  for (const fn of queue) {
    fn();
  }
};
let frame;
function raf() {
  if (frame) {
    return;
  }
  frame = requestAnimationFrame(() => {
    frame = void 0;
    tick();
  });
}
function rafThrottle(fn) {
  if (isTest()) {
    return fn;
  }
  return () => {
    if (rafQueue.includes(fn)) {
      return;
    }
    rafQueue.push(fn);
    raf();
  };
}
function throttledRaf(fn) {
  if (isTest()) {
    return fn();
  }
  if (rafQueue.includes(fn)) {
    return;
  }
  rafQueue.push(fn);
  raf();
}
//# sourceMappingURL=raf.js.map
