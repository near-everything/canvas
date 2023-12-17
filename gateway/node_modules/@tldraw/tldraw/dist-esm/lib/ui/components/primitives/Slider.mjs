import { jsx, jsxs } from "react/jsx-runtime";
import { Range, Root, Thumb, Track } from "@radix-ui/react-slider";
import { useEditor } from "@tldraw/editor";
import { memo, useCallback } from "react";
import { useTranslation } from "../../hooks/useTranslation/useTranslation.mjs";
const Slider = memo(function Slider2(props) {
  const { title, steps, value, label, onValueChange } = props;
  const editor = useEditor();
  const msg = useTranslation();
  const handleValueChange = useCallback(
    (value2) => {
      onValueChange(value2[0], true);
    },
    [onValueChange]
  );
  const handlePointerDown = useCallback(() => {
    editor.mark("click slider");
  }, [editor]);
  const handlePointerUp = useCallback(() => {
    if (!value)
      return;
    onValueChange(value, false);
  }, [value, onValueChange]);
  return /* @__PURE__ */ jsx("div", { className: "tlui-slider__container", children: /* @__PURE__ */ jsxs(
    Root,
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
        /* @__PURE__ */ jsx(Track, { className: "tlui-slider__track", dir: "ltr", children: value !== null && /* @__PURE__ */ jsx(Range, { className: "tlui-slider__range", dir: "ltr" }) }),
        value !== null && /* @__PURE__ */ jsx(Thumb, { className: "tlui-slider__thumb", dir: "ltr" })
      ]
    }
  ) });
});
export {
  Slider
};
//# sourceMappingURL=Slider.mjs.map
