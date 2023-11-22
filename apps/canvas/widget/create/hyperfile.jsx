const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const Select = styled.select`
  padding: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const adapters = [
  // these can come from the user (or app) settings
  // {
  //   title: "Local Storage",
  //   value: "everycanvas.near/widget/adapter.local",
  // },
  // {
  //   title: "SocialDB",
  //   value: "everycanvas.near/widget/adapter.social",
  // },
  {
    title: "IPFS",
    value: "everycanvas.near/widget/adapter.ipfs",
  },
  // {
  //   title: "GitHub",
  //   value: "hack.near/widget/adapter.github",
  // },
  // {
  //   title: "Obsidian",
  //   value: "hack.near/widget/adapter.obsidian",
  // },
  // {
  //   title: "Tldraw",
  //   value: "hack.near/widget/adapter.tldraw",
  // },
];

const defaultAdapter = adapters[0];

const [json, setJson] = useState(props.data ?? "");
const [source, setSource] = useState(props.source ?? "");
const [adapter, setAdapter] = useState(defaultAdapter.value ?? "");
const [reference, setReference] = useState(undefined);
const [filename, setFilename] = useState(props.filename ?? "");

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const thingId = filename ?? generateUID();

const handleCreate = () => {
  // load in the state.adapter
  const { create } = VM.require(adapter) || (() => {});
  if (create) {
    create(json).then((reference) => {
      console.log("reference", reference);
      const hyperfile = {
        thing: {
          [thingId]: {
            "": JSON.stringify({
              fileformat: `${props.type}.${source}`,
              source: source,
              adapter: adapter,
              reference: reference,
            }),
            metadata: {
              type: props.type,
            },
          },
        },
      };
      // we're not logged in, so it doesn't do anything!
      Social.set(hyperfile, { force: true });
    });
  }
};

return (
  <Wrapper>
    <Form>
      <FormGroup>
        <Label>source</Label>
        <Input
          type="text"
          value={source}
          onChange={(e) => onChangeSource(e.target.value)}
          disabled={props.source} // disable if source is passed in
        />
      </FormGroup>
      <textarea
        className="form-control mb-3"
        rows={5}
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />
      <FormGroup>
        <Label>adapter</Label>
        <Select value={adapter} onChange={(e) => setAdapter(e.target.value)}>
          {adapters.map((o) => (
            <option value={o.value}>{o.title}</option>
          ))}
        </Select>
      </FormGroup>
      <button className="btn btn-success mb-1" onClick={handleCreate}>
        Create
      </button>
    </Form>
  </Wrapper>
);
