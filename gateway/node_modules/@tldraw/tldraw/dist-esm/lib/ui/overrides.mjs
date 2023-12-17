import { objectMapEntries } from "@tldraw/editor";
import { useMemo } from "react";
import { useBreakpoint } from "./hooks/useBreakpoint.mjs";
import { useDialogs } from "./hooks/useDialogsProvider.mjs";
import { useToasts } from "./hooks/useToastsProvider.mjs";
import { useTranslation } from "./hooks/useTranslation/useTranslation.mjs";
function useDefaultHelpers() {
  const { addToast, removeToast, clearToasts } = useToasts();
  const { addDialog, clearDialogs, removeDialog, updateDialog } = useDialogs();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint < 5;
  const msg = useTranslation();
  return useMemo(
    () => ({
      addToast,
      removeToast,
      clearToasts,
      addDialog,
      clearDialogs,
      removeDialog,
      updateDialog,
      msg,
      isMobile
    }),
    [
      addDialog,
      addToast,
      clearDialogs,
      clearToasts,
      msg,
      removeDialog,
      removeToast,
      updateDialog,
      isMobile
    ]
  );
}
function mergeOverrides(overrides, defaultHelpers) {
  const mergedTranslations = {};
  for (const override of overrides) {
    if (override.translations) {
      for (const [key, value] of objectMapEntries(override.translations)) {
        let strings = mergedTranslations[key];
        if (!strings) {
          strings = mergedTranslations[key] = {};
        }
        Object.assign(strings, value);
      }
    }
  }
  return {
    actionsMenu: (editor, schema, helpers) => {
      for (const override of overrides) {
        if (override.actionsMenu) {
          schema = override.actionsMenu(editor, schema, { ...defaultHelpers, ...helpers });
        }
      }
      return schema;
    },
    actions: (editor, schema) => {
      for (const override of overrides) {
        if (override.actions) {
          schema = override.actions(editor, schema, defaultHelpers);
        }
      }
      return schema;
    },
    contextMenu: (editor, schema, helpers) => {
      for (const override of overrides) {
        if (override.contextMenu) {
          schema = override.contextMenu(editor, schema, { ...defaultHelpers, ...helpers });
        }
      }
      return schema;
    },
    helpMenu: (editor, schema, helpers) => {
      for (const override of overrides) {
        if (override.helpMenu) {
          schema = override.helpMenu(editor, schema, { ...defaultHelpers, ...helpers });
        }
      }
      return schema;
    },
    menu: (editor, schema, helpers) => {
      for (const override of overrides) {
        if (override.menu) {
          schema = override.menu(editor, schema, { ...defaultHelpers, ...helpers });
        }
      }
      return schema;
    },
    toolbar: (editor, schema, helpers) => {
      for (const override of overrides) {
        if (override.toolbar) {
          schema = override.toolbar(editor, schema, { ...defaultHelpers, ...helpers });
        }
      }
      return schema;
    },
    keyboardShortcutsMenu: (editor, schema, helpers) => {
      for (const override of overrides) {
        if (override.keyboardShortcutsMenu) {
          schema = override.keyboardShortcutsMenu(editor, schema, { ...defaultHelpers, ...helpers });
        }
      }
      return schema;
    },
    tools: (editor, schema, helpers) => {
      for (const override of overrides) {
        if (override.tools) {
          schema = override.tools(editor, schema, { ...defaultHelpers, ...helpers });
        }
      }
      return schema;
    },
    translations: mergedTranslations
  };
}
function useShallowArrayEquality(array) {
  return useMemo(() => array, array);
}
function useMergedTranslationOverrides(overrides) {
  const overridesArray = useShallowArrayEquality(
    overrides == null ? [] : Array.isArray(overrides) ? overrides : [overrides]
  );
  return useMemo(() => {
    const mergedTranslations = {};
    for (const override of overridesArray) {
      if (override.translations) {
        for (const [key, value] of objectMapEntries(override.translations)) {
          let strings = mergedTranslations[key];
          if (!strings) {
            strings = mergedTranslations[key] = {};
          }
          Object.assign(strings, value);
        }
      }
    }
    return mergedTranslations;
  }, [overridesArray]);
}
function useMergedOverrides(overrides) {
  const defaultHelpers = useDefaultHelpers();
  const overridesArray = useShallowArrayEquality(
    overrides == null ? [] : Array.isArray(overrides) ? overrides : [overrides]
  );
  return useMemo(
    () => mergeOverrides(overridesArray, defaultHelpers),
    [overridesArray, defaultHelpers]
  );
}
export {
  mergeOverrides,
  useDefaultHelpers,
  useMergedOverrides,
  useMergedTranslationOverrides
};
//# sourceMappingURL=overrides.mjs.map
