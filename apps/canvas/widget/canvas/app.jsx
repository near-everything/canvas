const canvasSrc = props.canvasSrc || "efiz.near/thing/canvas";

const accountId = context.accountId;

const Container = styled.div`
  height: 95vh;
  width: 100%;
`;

const [snapshot, setSnapshot] = useState(null);

const data = useMemo(() => JSON.parse(Social.get(canvasSrc, "final") || "null"));

if (!data) {
  return <Container>Invalid</Container>;
}

return (
  <Container>
    <Widget
      src="/*__@appAccount__*//widget/canvas.core"
      props={{ data }}
    />
  </Container>
);
