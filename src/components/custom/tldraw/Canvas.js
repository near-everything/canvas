import { Tldraw, useEditor } from "@tldraw/tldraw";
import React, { useCallback } from "react";
import { ResponseShapeUtil } from "./ResponseShape";
import { TldrawLogo } from "./TldrawLogo";
import { Widget } from "near-social-vm";
import { ActionButton } from "../../ActionButton";

const shapeUtils = [ResponseShapeUtil];

function TestButton() {
  const editor = useEditor();

  const handleClick = useCallback(() => {
    const selectedShapes = editor.getSelectedShapeIds();
    console.log(selectedShapes);
    // try {
    // 	await makeReal(editor)
    // } catch (e) {
    // 	console.error(e)
    // 	addToast({
    // 		icon: 'cross-2',
    // 		title: 'Something went wrong',
    // 		description: (e as Error).message.slice(0, 100),
    // 	})
    // }
  }, []);

  return <button onClick={handleClick}>Test</button>;
}

function EverythingCanvas({
  initialSnapshot,
  trigger,
  onGetData,
  persistenceKey,
  autoFocus,
  hideUi,
}) {
  // const [editor, setEditor] = useState();

  // const setAppToState = useCallback((editorInstance) => {
  //   setEditor(editorInstance);
  //   editorInstance.store.loadSnapshot(initialSnapshot);
  // }, []);

  // useEffect(() => {
  //   if (trigger) {
  //     const snapshot = editor.store.getSnapshot();
  //     const stringified = JSON.stringify(snapshot);
  //     onGetData(stringified);
  //   }
  // }, [trigger, onGetData]);

  return (
    <div className={"tldraw__editor"}>
      <Tldraw
        persistenceKey={"tldraw"}
        shapeUtils={shapeUtils}
        shareZone={
          <div className={"tldraw__shareZone"}>
            {/* We can put whatever want here... */}
            <TestButton />
            {/* <Widget src="efiz.near/widget/Tree" /> */}
          </div>
        }
      >
        <ActionButton />
        <TldrawLogo />
      </Tldraw>
    </div>
    // <Tldraw
    //   persistenceKey={persistenceKey}
    //   autoFocus={autoFocus}
    //   hideUi={hideUi}
    //   onMount={setAppToState}
    // >
    //   <Canvas />
    // </Tldraw>
  );
}

export default EverythingCanvas;
