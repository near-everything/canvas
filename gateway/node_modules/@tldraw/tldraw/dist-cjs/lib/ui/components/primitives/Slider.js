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
var Slider_exports = {};
__export(Slider_exports, {
  Slider: () => Slider
});
module.exports = __toCommonJS(Slider_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react_slider = require("@radix-ui/react-slider");
var import_editor = require("@tldraw/editor");
var import_react = require("react");
var import_useTranslation = require("../../hooks/useTranslation/useTranslation");
const Slider = (0, import_react.memo)(function Slider2(props) {
  const { title, steps, value, label, onValueChange } = props;
  const editor = (0, import_editor.useEditor)();
  const msg = (0, import_useTranslation.useTranslation)();
  const handleValueChange = (0, import_react.useCallback)(
    (value2) => {
      onValueChange(value2[0], true);
    },
    [onValueChange]
  );
  const handlePointerDown = (0, import_react.useCallback)(() => {
    editor.mark("click slider");
  }, [editor]);
  const handlePointerUp = (0, import_react.useCallback)(() => {
    if (!value)
      return;
    onValueChange(value, false);
  }, [value, onValueChange]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tlui-slider__container", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_react_slider.Root,
    {
      "data-testid": props["data-testid"],
      className: "tlui-slider",
      "area-label": "Opacity",
      dir: "ltr",
      min: 0,
      max: steps,
      step: 1,
      value: value ? [value] : void 0,
      onPointerDown: handlePointerDown,
      onValueChange: handleValueChange,
      onPointerUp: handlePointerUp,
      title: title + " \u2014 " + msg(label),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_slider.Track, { className: "tlui-slider__track", dir: "ltr", children: value !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_slider.Range, { className: "tlui-slider__range", dir: "ltr" }) }),
        value !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_slider.Thumb, { className: "tlui-slider__thumb", dir: "ltr" })
      ]
    }
  ) });
});
//# sourceMappingURL=Slider.js.map
