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
var getTextLabelSvgElement_exports = {};
__export(getTextLabelSvgElement_exports, {
  getTextLabelSvgElement: () => getTextLabelSvgElement
});
module.exports = __toCommonJS(getTextLabelSvgElement_exports);
var import_createTextSvgElementFromSpans = require("./createTextSvgElementFromSpans");
var import_default_shape_constants = require("./default-shape-constants");
var import_legacyProps = require("./legacyProps");
function getTextLabelSvgElement({
  bounds,
  editor,
  font,
  shape
}) {
  const padding = 16;
  const opts = {
    fontSize: import_default_shape_constants.LABEL_FONT_SIZES[shape.props.size],
    fontFamily: font,
    textAlign: shape.props.align,
    verticalTextAlign: shape.props.verticalAlign,
    width: Math.ceil(bounds.width),
    height: Math.ceil(bounds.height),
    padding: 16,
    lineHeight: import_default_shape_constants.TEXT_PROPS.lineHeight,
    fontStyle: "normal",
    fontWeight: "normal",
    overflow: "wrap",
    offsetX: 0
  };
  const spans = editor.textMeasure.measureTextSpans(shape.props.text, opts);
  const offsetX = (0, import_legacyProps.getLegacyOffsetX)(shape.props.align, padding, spans, bounds.width);
  if (offsetX) {
    opts.offsetX = offsetX;
  }
  const textElm = (0, import_createTextSvgElementFromSpans.createTextSvgElementFromSpans)(editor, spans, opts);
  return textElm;
}
//# sourceMappingURL=getTextLabelSvgElement.js.map
