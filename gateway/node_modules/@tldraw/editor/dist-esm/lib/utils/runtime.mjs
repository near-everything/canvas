const runtime = {
  openWindow: (url, target) => window.open(url, target, "noopener noreferrer"),
  refreshPage: () => window.location.reload(),
  hardReset: async () => await window.__tldraw__hardReset?.()
};
function setRuntimeOverrides(input) {
  Object.assign(runtime, input);
}
export {
  runtime,
  setRuntimeOverrides
};
//# sourceMappingURL=runtime.mjs.map
