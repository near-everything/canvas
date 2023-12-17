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
var useCoarsePointer_exports = {};
__export(useCoarsePointer_exports, {
  useCoarsePointer: () => useCoarsePointer
});
module.exports = __toCommonJS(useCoarsePointer_exports);
var import_react = require("react");
var import_useEditor = require("./useEditor");
function useCoarsePointer() {
  const editor = (0, import_useEditor.useEditor)();
  (0, import_react.useEffect)(() => {
    if (editor.environment.isFirefox && !editor.environment.isAndroid && !editor.environment.isIos) {
      editor.updateInstanceState({ isCoarsePointer: false });
      return;
    }
    if (window.matchMedia) {
      const mql = window.matchMedia("(pointer: coarse)");
      const handler = () => {
        editor.updateInstanceState({ isCoarsePointer: !!mql.matches });
      };
      handler();
      if (mql) {
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
      }
    }
  }, [editor]);
}
//# sourceMappingURL=useCoarsePointer.js.map
