import { useEditor } from "@tldraw/tldraw";
import { Widget } from "near-social-vm";
import React, { useCallback } from "react";
import { useBosLoaderStore } from "../../../stores/bos-loader";

function ShareZone() {
  const editor = useEditor();
  const redirectMapStore = useBosLoaderStore();

  const getSelectedShapeIds = useCallback(() => {
    return editor.getSelectedShapeIds();
  }, [editor]);

  const getSelectedShapes = useCallback(() => {
    return editor.getSelectedShapes();
  }, [editor]);

  const getSnapshot = useCallback(() => {
    return editor.store.getSnapshot();
  });

  return (
    <Widget
      key={JSON.stringify(getSelectedShapeIds)}
      src="everycanvas.near/widget/save"
      props={{ getSnapshot: getSnapshot }}
      config={{
        redirectMap: redirectMapStore.redirectMap,
      }}
    />
  );
}

export default ShareZone;
