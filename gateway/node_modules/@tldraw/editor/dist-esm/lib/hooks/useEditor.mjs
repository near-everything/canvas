import React from "react";
const EditorContext = React.createContext({});
const useEditor = () => {
  return React.useContext(EditorContext);
};
export {
  EditorContext,
  useEditor
};
//# sourceMappingURL=useEditor.mjs.map
