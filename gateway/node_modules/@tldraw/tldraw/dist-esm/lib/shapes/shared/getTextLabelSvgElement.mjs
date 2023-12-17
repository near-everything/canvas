import { createTextSvgElementFromSpans } from "./createTextSvgElementFromSpans.mjs";
import { LABEL_FONT_SIZES, TEXT_PROPS } from "./default-shape-constants.mjs";
import { getLegacyOffsetX } from "./legacyProps.mjs";
function getTextLabelSvgElement({
  bounds,
  editor,
  font,
  shape
}) {
  const padding = 16;
  const opts = {
    fontSize: LABEL_FONT_SIZES[shape.props.size],
    fontFamily: font,
    textAlign: shape.props.align,
    verticalTextAlign: shape.props.verticalAlign,
    width: Math.ceil(bounds.width),
    height: Math.ceil(bounds.height),
    padding: 16,
    lineHeight: TEXT_PROPS.lineHeight,
    fontStyle: "normal",
    fontWeight: "normal",
    overflow: "wrap",
    offsetX: 0
  };
  const spans = editor.textMeasure.measureTextSpans(shape.props.text, opts);
  const offsetX = getLegacyOffsetX(shape.props.align, padding, spans, bounds.width);
  if (offsetX) {
    opts.offsetX = offsetX;
  }
  const textElm = createTextSvgElementFromSpans(editor, spans, opts);
  return textElm;
}
export {
  getTextLabelSvgElement
};
//# sourceMappingURL=getTextLabelSvgElement.mjs.map
