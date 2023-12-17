import { useEditor } from "@tldraw/editor";
import { useEffect } from "react";
import { useToasts } from "./useToastsProvider.mjs";
function useEditorEvents() {
  const editor = useEditor();
  const { addToast } = useToasts();
  useEffect(() => {
    function handleMaxShapes({ name, count }) {
      addToast({
        title: "Maximum Shapes Reached",
        description: `You've reached the maximum number of shapes allowed on ${name} (${count}). Please delete some shapes or move to a different page to continue.`
      });
    }
    editor.addListener("max-shapes", handleMaxShapes);
    return () => {
      editor.removeListener("max-shapes", handleMaxShapes);
    };
  }, [editor, addToast]);
}
export {
  useEditorEvents
};
//# sourceMappingURL=useEditorEvents.mjs.map
