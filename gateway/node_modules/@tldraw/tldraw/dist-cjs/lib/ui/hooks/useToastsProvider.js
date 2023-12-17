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
var useToastsProvider_exports = {};
__export(useToastsProvider_exports, {
  ToastsContext: () => ToastsContext,
  ToastsProvider: () => ToastsProvider,
  useToasts: () => useToasts
});
module.exports = __toCommonJS(useToastsProvider_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = require("react");
const ToastsContext = (0, import_react.createContext)({});
function ToastsProvider({ children }) {
  const [toasts, setToasts] = (0, import_react.useState)([]);
  const addToast = (0, import_react.useCallback)((toast) => {
    const id = toast.id ?? (0, import_editor.uniqueId)();
    setToasts((d) => [...d.filter((m) => m.id !== toast.id), { ...toast, id }]);
    return id;
  }, []);
  const removeToast = (0, import_react.useCallback)((id) => {
    setToasts((d) => d.filter((m) => m.id !== id));
    return id;
  }, []);
  const clearToasts = (0, import_react.useCallback)(() => {
    setToasts(() => []);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastsContext.Provider, { value: { toasts, addToast, removeToast, clearToasts }, children });
}
function useToasts() {
  const ctx = (0, import_react.useContext)(ToastsContext);
  if (!ctx) {
    throw new Error("useToasts must be used within a ToastsProvider");
  }
  return ctx;
}
//# sourceMappingURL=useToastsProvider.js.map
