const canvasSrc = props.canvasSrc || "efiz.near/thing/canvas";

const accountId = context.accountId;

const Container = styled.div`
  height: 95vh;
  width: 100vw;
`;

let data;


if (canvasSrc) {
  data = JSON.parse(Social.get(canvasSrc, "final") || "null");

  if (!data) {
    return <Container>Invalid canvas</Container>;
  }
} else {
  data = JSON.parse(Social.get("*/thing/canvas", "final") || "null");
}


// return <p>{JSON.stringify(data)}</p>

const [snapshot, setSnapshot] = useState(data);

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
  height: auto;
`;

return (
  <Container>
    <ButtonRow>
      <Button onClick={getDataFromChild}>get canvas data</Button>
      <Button onClick={handlePublish} disabled={!canvasSnapshot}>
        publish
      </Button>
    </ButtonRow>
    <Widget
      src="/*__@appAccount__*//widget/canvas.core"
      props={{ snapshot, trigger, handleDataFromChild }}
    />
  </Container>
);
