const accountId = context.accountId;

if (!accountId) {
  return "please connect your NEAR account";
}

const { data, onSubmit } = props;

const options = [
  {
    title: "SocialDB",
    value: "everycanvas.near/widget/adapter.github",
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

const defaultOption = options[0];

State.init({
  source: defaultOption.title,
  adapter: defaultOption.value,
  reference: data,
});

const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
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

const TextArea = styled.textarea`
  padding: 5px;
  height: 222px;
  resize: vertical;
`;

const onChangeSource = (source) => {
  State.update({
    source,
  });
};

const onChangeAdapter = (adapter) => {
  State.update({
    adapter,
  });
};

const onChangeReference = (reference) => {
  State.update({
    reference,
  });
};

// function generateUID() {
//   return (
//     Math.random().toString(16).slice(2) +
//     Date.now().toString(36) +
//     Math.random().toString(16).slice(2)
//   );
// }

// const thingId = generateUID();

// const handleCreate = () => {
//   const data = {
//     thing: {
//       [thingId]: {
//         source: state.source,
//         adapter: state.adapter,
//         reference: state.reference,
//       },
//     },
//   };

//   Social.set(data);
// };

return (
  <Wrapper>
    <h4 className="mb-3">
      <b>hyperfile creator</b>
    </h4>
    <Form>
      {/* <Label>source</Label>
      <Input
        type="text"
        value={state.source}
        onChange={(e) => onChangeSource(e.target.value)}
      /> */}
      <Label>adapter</Label>
      <Select
        placeholder={placeholder}
        value={state.adapter}
        onChange={({ target: { value } }) => onChangeAdapter(value)}
      >
        {options.map((o) => (
          <option value={o.value}>{o.title}</option>
        ))}
      </Select>

      <Label htmlFor="reference">reference (JSON)</Label>
      <TextArea
        type="text"
        value={state.reference}
        onChange={(e) => onChangeReference(e.target.value)}
      />
      <button className="btn btn-success mt-3" onClick={() => onSubmit(state)}>
        create
      </button>
    </Form>
  </Wrapper>
);