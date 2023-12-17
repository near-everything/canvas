import {
  Box2d
} from "@tldraw/editor";
function correctSpacesToNbsp(input) {
  return input.replace(/\s/g, "\xA0");
}
function createTextSvgElementFromSpans(editor, spans, opts) {
  const { padding = 0 } = opts;
  const textElm = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textElm.setAttribute("font-size", opts.fontSize + "px");
  textElm.setAttribute("font-family", opts.fontFamily);
  textElm.setAttribute("font-style", opts.fontStyle);
  textElm.setAttribute("font-weight", opts.fontWeight);
  textElm.setAttribute("line-height", opts.lineHeight * opts.fontSize + "px");
  textElm.setAttribute("dominant-baseline", "mathematical");
  textElm.setAttribute("alignment-baseline", "mathematical");
  if (spans.length === 0)
    return textElm;
  const bounds = Box2d.From(spans[0].box);
  for (const { box } of spans) {
    bounds.union(box);
  }
  const offsetX = padding + (opts.offsetX ?? 0);
  const offsetY = (opts.offsetY ?? 0) + opts.fontSize / 2 + (opts.verticalTextAlign === "start" ? padding : opts.verticalTextAlign === "end" ? opts.height - padding - bounds.height : (Math.ceil(opts.height) - bounds.height) / 2);
  let currentLineTop = null;
  for (const { text, box } of spans) {
    const didBreakLine = currentLineTop !== null && box.y > currentLineTop;
    if (didBreakLine) {
      const lineBreakTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      lineBreakTspan.setAttribute("alignment-baseline", "mathematical");
      lineBreakTspan.setAttribute("x", offsetX + "px");
      lineBreakTspan.setAttribute("y", box.y + offsetY + "px");
      lineBreakTspan.textContent = "\n";
      textElm.appendChild(lineBreakTspan);
    }
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.setAttribute("alignment-baseline", "mathematical");
    tspan.setAttribute("x", box.x + offsetX + "px");
    tspan.setAttribute("y", box.y + offsetY + "px");
    const cleanText = correctSpacesToNbsp(text);
    tspan.textContent = cleanText;
    textElm.appendChild(tspan);
    currentLineTop = box.y;
  }
  if (opts.stroke && opts.strokeWidth) {
    textElm.setAttribute("stroke", opts.stroke);
    textElm.setAttribute("stroke-width", opts.strokeWidth + "px");
  }
  if (opts.fill) {
    textElm.setAttribute("fill", opts.fill);
  }
  return textElm;
}
export {
  createTextSvgElementFromSpans
};
//# sourceMappingURL=createTextSvgElementFromSpans.mjs.map
