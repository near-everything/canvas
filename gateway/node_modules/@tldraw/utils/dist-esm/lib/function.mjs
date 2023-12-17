function throttle(func, limit) {
  let inThrottle;
  let lastResult;
  return function(...args) {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
      lastResult = func(...args);
    }
    return lastResult;
  };
}
function omitFromStackTrace(fn) {
  const wrappedFn = (...args) => {
    try {
      return fn(...args);
    } catch (error) {
      if (error instanceof Error && Error.captureStackTrace) {
        Error.captureStackTrace(error, wrappedFn);
      }
      throw error;
    }
  };
  return wrappedFn;
}
function noop() {
}
export {
  noop,
  omitFromStackTrace,
  throttle
};
//# sourceMappingURL=function.mjs.map
