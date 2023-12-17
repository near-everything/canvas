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
var PageItemInput_exports = {};
__export(PageItemInput_exports, {
  PageItemInput: () => PageItemInput
});
module.exports = __toCommonJS(PageItemInput_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_Input = require("../primitives/Input");
const PageItemInput = function PageItemInput2({
  name,
  id,
  isCurrentPage
}) {
  const editor = (0, import_editor.useEditor)();
  const rInput = (0, import_react.useRef)(null);
  const handleChange = (0, import_react.useCallback)(
    (value) => {
      editor.renamePage(id, value ? value : "New Page", { ephemeral: true });
    },
    [editor, id]
  );
  const handleComplete = (0, import_react.useCallback)(
    (value) => {
      editor.mark("rename page");
      editor.renamePage(id, value || "New Page", { ephemeral: false });
    },
    [editor, id]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_Input.Input,
    {
      className: "tlui-page-menu__item__input",
      ref: (el) => rInput.current = el,
      defaultValue: name,
      onValueChange: handleChange,
      onComplete: handleComplete,
      onCancel: handleComplete,
      shouldManuallyMaintainScrollPositionWhenFocused: true,
      autofocus: isCurrentPage,
      autoselect: true
    }
  );
};
//# sourceMappingURL=PageItemInput.js.map
