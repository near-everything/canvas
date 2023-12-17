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
export {
  rafThrottle,
  throttledRaf
};
//# sourceMappingURL=raf.mjs.map
