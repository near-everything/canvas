import { jsx } from "react/jsx-runtime";
import { uniqueId } from "@tldraw/editor";
import { createContext, useCallback, useContext, useState } from "react";
const ToastsContext = createContext({});
function ToastsProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((toast) => {
    const id = toast.id ?? uniqueId();
    setToasts((d) => [...d.filter((m) => m.id !== toast.id), { ...toast, id }]);
    return id;
  }, []);
  const removeToast = useCallback((id) => {
    setToasts((d) => d.filter((m) => m.id !== id));
    return id;
  }, []);
  const clearToasts = useCallback(() => {
    setToasts(() => []);
  }, []);
  return /* @__PURE__ */ jsx(ToastsContext.Provider, { value: { toasts, addToast, removeToast, clearToasts }, children });
}
function useToasts() {
  const ctx = useContext(ToastsContext);
  if (!ctx) {
    throw new Error("useToasts must be used within a ToastsProvider");
  }
  return ctx;
}
export {
  ToastsContext,
  ToastsProvider,
  useToasts
};
//# sourceMappingURL=useToastsProvider.mjs.map
