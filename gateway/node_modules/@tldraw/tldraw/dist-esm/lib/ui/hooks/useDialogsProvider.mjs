import { jsx } from "react/jsx-runtime";
import { uniqueId, useEditor } from "@tldraw/editor";
import { createContext, useCallback, useContext, useState } from "react";
import { useUiEvents } from "./useEventsProvider.mjs";
const DialogsContext = createContext({});
function DialogsProvider({ children }) {
  const editor = useEditor();
  const trackEvent = useUiEvents();
  const [dialogs, setDialogs] = useState([]);
  const addDialog = useCallback(
    (dialog) => {
      const id = dialog.id ?? uniqueId();
      setDialogs((d) => {
        return [...d.filter((m) => m.id !== dialog.id), { ...dialog, id }];
      });
      trackEvent("open-menu", { source: "dialog", id });
      editor.addOpenMenu(id);
      return id;
    },
    [editor, trackEvent]
  );
  const updateDialog = useCallback(
    (id, newDialogData) => {
      setDialogs(
        (d) => d.map((m) => {
          if (m.id === id) {
            return {
              ...m,
              ...newDialogData
            };
          }
          return m;
        })
      );
      trackEvent("open-menu", { source: "dialog", id });
      editor.addOpenMenu(id);
      return id;
    },
    [editor, trackEvent]
  );
  const removeDialog = useCallback(
    (id) => {
      setDialogs(
        (d) => d.filter((m) => {
          if (m.id === id) {
            m.onClose?.();
            return false;
          }
          return true;
        })
      );
      trackEvent("close-menu", { source: "dialog", id });
      editor.deleteOpenMenu(id);
      return id;
    },
    [editor, trackEvent]
  );
  const clearDialogs = useCallback(() => {
    setDialogs((d) => {
      d.forEach((m) => {
        m.onClose?.();
        trackEvent("close-menu", { source: "dialog", id: m.id });
        editor.deleteOpenMenu(m.id);
      });
      return [];
    });
  }, [editor, trackEvent]);
  return /* @__PURE__ */ jsx(
    DialogsContext.Provider,
    {
      value: { dialogs, addDialog, removeDialog, clearDialogs, updateDialog },
      children
    }
  );
}
function useDialogs() {
  const ctx = useContext(DialogsContext);
  if (!ctx) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }
  return ctx;
}
export {
  DialogsContext,
  DialogsProvider,
  useDialogs
};
//# sourceMappingURL=useDialogsProvider.mjs.map
