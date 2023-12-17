"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useKeyboardShortcutsSchema_exports = {};
__export(useKeyboardShortcutsSchema_exports, {
  KeyboardShortcutsSchemaContext: () => KeyboardShortcutsSchemaContext,
  KeyboardShortcutsSchemaProvider: () => KeyboardShortcutsSchemaProvider,
  useKeyboardShortcutsSchema: () => useKeyboardShortcutsSchema
});
module.exports = __toCommonJS(useKeyboardShortcutsSchema_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = __toESM(require("react"));
var import_menuHelpers = require("./menuHelpers");
var import_useActions = require("./useActions");
var import_useTools = require("./useTools");
const KeyboardShortcutsSchemaContext = import_react.default.createContext(
  {}
);
const KeyboardShortcutsSchemaProvider = (0, import_editor.track)(function KeyboardShortcutsSchemaProvider2({
  overrides,
  children
}) {
  const editor = (0, import_editor.useEditor)();
  const tools = (0, import_useTools.useTools)();
  const actions = (0, import_useActions.useActions)();
  const keyboardShortcutsSchema = (0, import_react.useMemo)(() => {
    const keyboardShortcutsSchema2 = (0, import_editor.compact)([
      (0, import_menuHelpers.menuGroup)(
        "shortcuts-dialog.tools",
        (0, import_menuHelpers.menuItem)(actions["toggle-tool-lock"]),
        (0, import_menuHelpers.menuItem)(tools["select"]),
        (0, import_menuHelpers.menuItem)(tools["draw"]),
        (0, import_menuHelpers.menuItem)(tools["eraser"]),
        (0, import_menuHelpers.menuItem)(tools["hand"]),
        (0, import_menuHelpers.menuItem)(tools["rectangle"]),
        (0, import_menuHelpers.menuItem)(tools["ellipse"]),
        (0, import_menuHelpers.menuItem)(tools["arrow"]),
        (0, import_menuHelpers.menuItem)(tools["line"]),
        (0, import_menuHelpers.menuItem)(tools["text"]),
        (0, import_menuHelpers.menuItem)(tools["frame"]),
        (0, import_menuHelpers.menuItem)(tools["note"]),
        (0, import_menuHelpers.menuItem)(tools["laser"])
      ),
      (0, import_menuHelpers.menuGroup)(
        "shortcuts-dialog.file",
        (0, import_menuHelpers.menuItem)(actions["insert-media"]),
        (0, import_menuHelpers.menuItem)(actions["print"])
      ),
      (0, import_menuHelpers.menuGroup)(
        "shortcuts-dialog.preferences",
        (0, import_menuHelpers.menuItem)(actions["toggle-dark-mode"]),
        (0, import_menuHelpers.menuItem)(actions["toggle-focus-mode"]),
        (0, import_menuHelpers.menuItem)(actions["toggle-grid"])
      ),
      (0, import_menuHelpers.menuGroup)(
        "shortcuts-dialog.edit",
        (0, import_menuHelpers.menuItem)(actions["undo"]),
        (0, import_menuHelpers.menuItem)(actions["redo"]),
        (0, import_menuHelpers.menuItem)(actions["cut"]),
        (0, import_menuHelpers.menuItem)(actions["copy"]),
        (0, import_menuHelpers.menuItem)(actions["paste"]),
        (0, import_menuHelpers.menuItem)(actions["select-all"]),
        (0, import_menuHelpers.menuItem)(actions["delete"]),
        (0, import_menuHelpers.menuItem)(actions["duplicate"]),
        (0, import_menuHelpers.menuItem)(actions["export-as-svg"]),
        (0, import_menuHelpers.menuItem)(actions["export-as-png"])
      ),
      (0, import_menuHelpers.menuGroup)(
        "shortcuts-dialog.view",
        (0, import_menuHelpers.menuItem)(actions["zoom-in"]),
        (0, import_menuHelpers.menuItem)(actions["zoom-out"]),
        (0, import_menuHelpers.menuItem)(actions["zoom-to-100"]),
        (0, import_menuHelpers.menuItem)(actions["zoom-to-fit"]),
        (0, import_menuHelpers.menuItem)(actions["zoom-to-selection"])
      ),
      (0, import_menuHelpers.menuGroup)(
        "shortcuts-dialog.transform",
        (0, import_menuHelpers.menuItem)(actions["bring-to-front"]),
        (0, import_menuHelpers.menuItem)(actions["bring-forward"]),
        (0, import_menuHelpers.menuItem)(actions["send-backward"]),
        (0, import_menuHelpers.menuItem)(actions["send-to-back"]),
        (0, import_menuHelpers.menuItem)(actions["group"]),
        (0, import_menuHelpers.menuItem)(actions["ungroup"]),
        (0, import_menuHelpers.menuItem)(actions["flip-horizontal"]),
        (0, import_menuHelpers.menuItem)(actions["flip-vertical"]),
        (0, import_menuHelpers.menuItem)(actions["align-top"]),
        (0, import_menuHelpers.menuItem)(actions["align-center-vertical"]),
        (0, import_menuHelpers.menuItem)(actions["align-bottom"]),
        (0, import_menuHelpers.menuItem)(actions["align-left"]),
        (0, import_menuHelpers.menuItem)(actions["align-center-horizontal"]),
        (0, import_menuHelpers.menuItem)(actions["align-right"])
      )
    ]);
    if (overrides) {
      return overrides(editor, keyboardShortcutsSchema2, { tools, actions });
    }
    return keyboardShortcutsSchema2;
  }, [editor, overrides, actions, tools]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyboardShortcutsSchemaContext.Provider, { value: keyboardShortcutsSchema, children });
});
function useKeyboardShortcutsSchema() {
  const ctx = import_react.default.useContext(KeyboardShortcutsSchemaContext);
  if (!ctx) {
    throw new Error("Shortcuts must be used inside of a ShortcutsProvider.");
  }
  return ctx;
}
//# sourceMappingURL=useKeyboardShortcutsSchema.js.map
