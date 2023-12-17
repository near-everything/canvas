import { useEffect } from "react";
import { useEditor } from "./useEditor.mjs";
function useCoarsePointer() {
  const editor = useEditor();
  useEffect(() => {
    if (editor.environment.isFirefox && !editor.environment.isAndroid && !editor.environment.isIos) {
      editor.updateInstanceState({ isCoarsePointer: false });
      return;
    }
    if (window.matchMedia) {
      const mql = window.matchMedia("(pointer: coarse)");
      const handler = () => {
        editor.updateInstanceState({ isCoarsePointer: !!mql.matches });
      };
      handler();
      if (mql) {
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
      }
    }
  }, [editor]);
}
export {
  useCoarsePointer
};
//# sourceMappingURL=useCoarsePointer.mjs.map
