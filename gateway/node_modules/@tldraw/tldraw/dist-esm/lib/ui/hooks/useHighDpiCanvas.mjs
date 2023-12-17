import { useLayoutEffect } from "react";
function useHighDpiCanvas(ref, dpr) {
  useLayoutEffect(() => {
    const canvas = ref.current;
    if (!canvas)
      return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
  }, [ref, dpr]);
}
export {
  useHighDpiCanvas
};
//# sourceMappingURL=useHighDpiCanvas.mjs.map
