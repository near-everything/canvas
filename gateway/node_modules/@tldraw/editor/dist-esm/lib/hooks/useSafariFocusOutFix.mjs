import * as React from "react";
import { useEditor } from "./useEditor.mjs";
let isMobileSafari = false;
if (typeof window !== "undefined") {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  isMobileSafari = iOS && webkit && !ua.match(/CriOS/i);
}
function useSafariFocusOutFix() {
  const editor = useEditor();
  React.useEffect(() => {
    if (!isMobileSafari)
      return;
    function handleFocusOut(e) {
      if (e.target instanceof HTMLInputElement && e.target.type === "text" || e.target instanceof HTMLTextAreaElement) {
        editor.complete();
      }
    }
    document.addEventListener("focusout", handleFocusOut);
    return () => document.removeEventListener("focusout", handleFocusOut);
  }, [editor]);
}
export {
  useSafariFocusOutFix
};
//# sourceMappingURL=useSafariFocusOutFix.mjs.map
