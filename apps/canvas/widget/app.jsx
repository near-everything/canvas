const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const Panel = styled.div`
  flex: 1;
  border: 1px solid black;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid black;
`;

const Select = styled.select``;

const Option = styled.option``;

const Button = styled.button``;

function PanelHeader({ options, onChange }) {
  return (
    <Header>
      <Select onChange={(e) => onChange(e.target.value)}>
        {options &&
          options.map((it) => <Option value={it.value}>{it.label}</Option>)}
      </Select>
      <Button
        onClick={() =>
          Social.set({
            index: {
              every: JSON.stringify({
                key: "thing", // type
                value: {
                  src: "efiz.near/widget/Tree",
                },
              }),
            },
          })
        }
      >
        Publish
      </Button>
    </Header>
  );
}

const [editorValue, setEditorValue] = useState("");
const [editorSrc, setEditorSrc] = useState(
  "/*__@appAccount__*//widget/markdown.edit"
);
const [viewerSrc, setViewerSrc] = useState(
  "/*__@appAccount__*//widget/markdown.view"
);
const [selectedItem, setSelectedItem] = useState(null);

function handleEditorSrcChange(value) {
  setEditorSrc(value);
}

function handleViewerSrcChange(value) {
  setViewerSrc(value);
}

function Editor({ value, setEditorValue }) {
  return (
    <Widget
      src={"/*__@appAccount__*//widget/provider"}
      props={{
        path: value,
        editorValue,
        blockHeight: "final",
        setEditorValue,
        Children: (p) => <Widget src={editorSrc} props={p} />,
      }}
    />
  );
}

function Viewer({ value }) {
  return <Widget src={viewerSrc} props={{ value }} />;
}

function Sidebar() {
  return (
    <Widget
      src="/*__@appAccount__*//widget/sidebar"
      props={{ handleItemClick: (v) => setSelectedItem(v) }}
    />
  );
}

return (
  <Container>
    <Panel style={{ maxWidth: "200px" }}>
      <Wrapper key={editorSrc}>
        <Sidebar />
      </Wrapper>
    </Panel>
    <Panel>
      <PanelHeader
        options={[
          {
            value: "/*__@appAccount__*//widget/markdown.edit",
            label: "Markdown",
          },
          { value: "/*__@appAccount__*//widget/code.edit", label: "Code" },
          { value: "/*__@appAccount__*//widget/canvas.edit", label: "Canvas" },
        ]}
        onChange={handleEditorSrcChange}
      />
      <Wrapper key={editorSrc}>
        <Editor value={selectedItem} setEditorValue={setEditorValue} />
      </Wrapper>
    </Panel>
    <Panel>
      <PanelHeader
        options={[
          {
            value: "/*__@appAccount__*//widget/markdown.view",
            label: "Markdown",
          },
          { value: "/*__@appAccount__*//widget/code.view", label: "Code" },
          { value: "/*__@appAccount__*//widget/canvas.view", label: "Canvas" },
        ]}
        onChange={handleViewerSrcChange}
      />
      <Wrapper key={viewerSrc}>
        <Viewer value={editorValue} />
      </Wrapper>
    </Panel>
  </Container>
);
