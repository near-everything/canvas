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
var useDialogsProvider_exports = {};
__export(useDialogsProvider_exports, {
  DialogsContext: () => DialogsContext,
  DialogsProvider: () => DialogsProvider,
  useDialogs: () => useDialogs
});
module.exports = __toCommonJS(useDialogsProvider_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_useEventsProvider = require("./useEventsProvider");
const DialogsContext = (0, import_react.createContext)({});
function DialogsProvider({ children }) {
  const editor = (0, import_editor.useEditor)();
  const trackEvent = (0, import_useEventsProvider.useUiEvents)();
  const [dialogs, setDialogs] = (0, import_react.useState)([]);
  const addDialog = (0, import_react.useCallback)(
    (dialog) => {
      const id = dialog.id ?? (0, import_editor.uniqueId)();
      setDialogs((d) => {
        return [...d.filter((m) => m.id !== dialog.id), { ...dialog, id }];
      });
      trackEvent("open-menu", { source: "dialog", id });
      editor.addOpenMenu(id);
      return id;
    },
    [editor, trackEvent]
  );
  const updateDialog = (0, import_react.useCallback)(
    (id, newDialogData) => {
      setDialogs(
        (d) => d.map((m) => {
          if (m.id === id) {
            return {
              ...m,
              ...newDialogData
            };
          }
          return m;
        })
      );
      trackEvent("open-menu", { source: "dialog", id });
      editor.addOpenMenu(id);
      return id;
    },
    [editor, trackEvent]
  );
  const removeDialog = (0, import_react.useCallback)(
    (id) => {
      setDialogs(
        (d) => d.filter((m) => {
          if (m.id === id) {
            m.onClose?.();
            return false;
          }
          return true;
        })
      );
      trackEvent("close-menu", { source: "dialog", id });
      editor.deleteOpenMenu(id);
      return id;
    },
    [editor, trackEvent]
  );
  const clearDialogs = (0, import_react.useCallback)(() => {
    setDialogs((d) => {
      d.forEach((m) => {
        m.onClose?.();
        trackEvent("close-menu", { source: "dialog", id: m.id });
        editor.deleteOpenMenu(m.id);
      });
      return [];
    });
  }, [editor, trackEvent]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    DialogsContext.Provider,
    {
      value: { dialogs, addDialog, removeDialog, clearDialogs, updateDialog },
      children
    }
  );
}
function useDialogs() {
  const ctx = (0, import_react.useContext)(DialogsContext);
  if (!ctx) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }
  return ctx;
}
//# sourceMappingURL=useDialogsProvider.js.map
