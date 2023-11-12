const { data } = props;
const [trigger, setTrigger] = useState(false);
const [canvasSnapshot, setCanvasSnapshot] = useState(null);

const getDataFromChild = () => {
  setTrigger(true); // Triggers the effect in the child
};

const handleDataFromChild = (data) => {
  setCanvasSnapshot(data);
  setTrigger(false); // Reset the trigger
};

const handlePublish = () => {
  Social.set({
    thing: {
      canvas: canvasSnapshot,
    },
  });
};

const Button = styled.button``;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  // height: auto;
`;

return (
  <>
    <ButtonRow>
      <Button onClick={getDataFromChild}>get canvas data</Button>
      <Button onClick={handlePublish}>publish</Button>
    </ButtonRow>
    <Canvas
      initialSnapshot={data || {}}
      trigger={trigger}
      onGetData={handleDataFromChild}
      persistance={canvasSrc}
      autoFocus={true}
    />
  </>
);
