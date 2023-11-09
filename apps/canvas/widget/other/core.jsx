const { initialShapes, hideUi } = props;

const [hide, setHide] = useState(false);

const [trigger, setTrigger] = useState(false);
const [canvasData, setCanvasData] = useState(null);

const getDataFromChild = () => {
  setTrigger(true); // Triggers the effect in the child
};

const handleGetData = (data) => {
  setCanvasData(data);
  setTrigger(false); // Reset the trigger
};

return (
  <>
    <button onClick={getDataFromChild}>Get Data</button>
    <button onClick={handlePublish} disabled={!canvasData}>Publish</button>
    <Canvas
      initialShapes={initialShapes}
      hideUi={hide}
      handleChangeEvent={onChange}
      trigger={trigger}
      onGetData={handleGetData}
    />
  </>
);
