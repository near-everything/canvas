import { jsx } from "react/jsx-runtime";
import { useEditor } from "@tldraw/editor";
import { useCallback, useRef } from "react";
import { Input } from "../primitives/Input.mjs";
const PageItemInput = function PageItemInput2({
  name,
  id,
  isCurrentPage
}) {
  const editor = useEditor();
  const rInput = useRef(null);
  const handleChange = useCallback(
    (value) => {
      editor.renamePage(id, value ? value : "New Page", { ephemeral: true });
    },
    [editor, id]
  );
  const handleComplete = useCallback(
    (value) => {
      editor.mark("rename page");
      editor.renamePage(id, value || "New Page", { ephemeral: false });
    },
    [editor, id]
  );
  return /* @__PURE__ */ jsx(
    Input,
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
export {
  PageItemInput
};
//# sourceMappingURL=PageItemInput.mjs.map
