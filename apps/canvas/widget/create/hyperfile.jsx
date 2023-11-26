const Wrapper = styled.div`
  max-width: 400px;
  margin: 1rem auto;
`;

const TabContent = styled.div`
  margin-top: 20px;
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
const [activeTab, setActiveTab] = useState("data");
const [name, setName] = useState(props.name ?? "");
const [description, setDescription] = useState(props.description ?? "");

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
        [props.type]: {
          [thingId]: {
            "": JSON.stringify({
              fileformat: `${props.type}.${source}`,
              source: source,
              adapter: adapter,
              reference: reference,
            }),
            metadata: {
              name: name,
              description: description,
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
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "data" ? "active" : ""}`}
          onClick={() => setActiveTab("data")}
        >
          Data
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${activeTab === "metadata" ? "active" : ""}`}
          onClick={() => setActiveTab("metadata")}
        >
          Metadata
        </a>
      </li>
    </ul>

    <TabContent>
      {activeTab === "data" && (
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
            <Select
              value={adapter}
              onChange={(e) => setAdapter(e.target.value)}
            >
              {adapters.map((o) => (
                <option value={o.value}>{o.title}</option>
              ))}
            </Select>
          </FormGroup>
        </Form>
      )}
    </TabContent>
    <TabContent>
      {activeTab === "metadata" && (
        <Form>
          <FormGroup>
            <Label>name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>description</Label>
            <textarea
              className="form-control mb-3"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
        </Form>
      )}
    </TabContent>
    <FormGroup>
      <button className="btn btn-success" onClick={handleCreate}>
        Create
      </button>
    </FormGroup>
  </Wrapper>
);
