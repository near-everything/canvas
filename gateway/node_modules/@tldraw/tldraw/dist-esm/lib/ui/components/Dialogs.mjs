import { Fragment, jsx } from "react/jsx-runtime";
import * as _Dialog from "@radix-ui/react-dialog";
import { useContainer } from "@tldraw/editor";
import React, { useCallback } from "react";
import { useDialogs } from "../hooks/useDialogsProvider.mjs";
const Dialog = ({ id, component: ModalContent, onClose }) => {
  const { removeDialog } = useDialogs();
  const container = useContainer();
  const handleOpenChange = useCallback(
    (isOpen) => {
      if (!isOpen) {
        if (onClose) {
          try {
            onClose();
          } catch (err) {
            console.warn(err);
          }
        }
        removeDialog(id);
      }
    },
    [id, onClose, removeDialog]
  );
  return /* @__PURE__ */ jsx(_Dialog.Root, { onOpenChange: handleOpenChange, defaultOpen: true, children: /* @__PURE__ */ jsx(_Dialog.Portal, { container, children: /* @__PURE__ */ jsx(_Dialog.Overlay, { dir: "ltr", className: "tlui-dialog__overlay", children: /* @__PURE__ */ jsx(_Dialog.Content, { dir: "ltr", className: "tlui-dialog__content", children: /* @__PURE__ */ jsx(ModalContent, { onClose: () => handleOpenChange(false) }) }) }) }) });
};
function _Dialogs() {
  const { dialogs } = useDialogs();
  return /* @__PURE__ */ jsx(Fragment, { children: dialogs.map((dialog) => /* @__PURE__ */ jsx(Dialog, { ...dialog }, dialog.id)) });
}
const Dialogs = React.memo(_Dialogs);
export {
  Dialogs
};
//# sourceMappingURL=Dialogs.mjs.map
