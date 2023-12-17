import { jsx } from "react/jsx-runtime";
import { compact, track, useEditor } from "@tldraw/editor";
import React, { useMemo } from "react";
import { menuGroup, menuItem } from "./menuHelpers.mjs";
import { useActions } from "./useActions.mjs";
import { useTools } from "./useTools.mjs";
const KeyboardShortcutsSchemaContext = React.createContext(
  {}
);
const KeyboardShortcutsSchemaProvider = track(function KeyboardShortcutsSchemaProvider2({
  overrides,
  children
}) {
  const editor = useEditor();
  const tools = useTools();
  const actions = useActions();
  const keyboardShortcutsSchema = useMemo(() => {
    const keyboardShortcutsSchema2 = compact([
      menuGroup(
        "shortcuts-dialog.tools",
        menuItem(actions["toggle-tool-lock"]),
        menuItem(tools["select"]),
        menuItem(tools["draw"]),
        menuItem(tools["eraser"]),
        menuItem(tools["hand"]),
        menuItem(tools["rectangle"]),
        menuItem(tools["ellipse"]),
        menuItem(tools["arrow"]),
        menuItem(tools["line"]),
        menuItem(tools["text"]),
        menuItem(tools["frame"]),
        menuItem(tools["note"]),
        menuItem(tools["laser"])
      ),
      menuGroup(
        "shortcuts-dialog.file",
        menuItem(actions["insert-media"]),
        menuItem(actions["print"])
      ),
      menuGroup(
        "shortcuts-dialog.preferences",
        menuItem(actions["toggle-dark-mode"]),
        menuItem(actions["toggle-focus-mode"]),
        menuItem(actions["toggle-grid"])
      ),
      menuGroup(
        "shortcuts-dialog.edit",
        menuItem(actions["undo"]),
        menuItem(actions["redo"]),
        menuItem(actions["cut"]),
        menuItem(actions["copy"]),
        menuItem(actions["paste"]),
        menuItem(actions["select-all"]),
        menuItem(actions["delete"]),
        menuItem(actions["duplicate"]),
        menuItem(actions["export-as-svg"]),
        menuItem(actions["export-as-png"])
      ),
      menuGroup(
        "shortcuts-dialog.view",
        menuItem(actions["zoom-in"]),
        menuItem(actions["zoom-out"]),
        menuItem(actions["zoom-to-100"]),
        menuItem(actions["zoom-to-fit"]),
        menuItem(actions["zoom-to-selection"])
      ),
      menuGroup(
        "shortcuts-dialog.transform",
        menuItem(actions["bring-to-front"]),
        menuItem(actions["bring-forward"]),
        menuItem(actions["send-backward"]),
        menuItem(actions["send-to-back"]),
        menuItem(actions["group"]),
        menuItem(actions["ungroup"]),
        menuItem(actions["flip-horizontal"]),
        menuItem(actions["flip-vertical"]),
        menuItem(actions["align-top"]),
        menuItem(actions["align-center-vertical"]),
        menuItem(actions["align-bottom"]),
        menuItem(actions["align-left"]),
        menuItem(actions["align-center-horizontal"]),
        menuItem(actions["align-right"])
      )
    ]);
    if (overrides) {
      return overrides(editor, keyboardShortcutsSchema2, { tools, actions });
    }
    return keyboardShortcutsSchema2;
  }, [editor, overrides, actions, tools]);
  return /* @__PURE__ */ jsx(KeyboardShortcutsSchemaContext.Provider, { value: keyboardShortcutsSchema, children });
});
function useKeyboardShortcutsSchema() {
  const ctx = React.useContext(KeyboardShortcutsSchemaContext);
  if (!ctx) {
    throw new Error("Shortcuts must be used inside of a ShortcutsProvider.");
  }
  return ctx;
}
export {
  KeyboardShortcutsSchemaContext,
  KeyboardShortcutsSchemaProvider,
  useKeyboardShortcutsSchema
};
//# sourceMappingURL=useKeyboardShortcutsSchema.mjs.map
