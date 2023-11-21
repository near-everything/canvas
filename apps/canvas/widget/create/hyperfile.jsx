
props.fileType ||
  initState({
    json: props.data ?? "",
    name: "canvas" // temp
  });

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const UploadJson = () => {
  if (state.json.length) {
    const body = new Blob([state.json], { type: "application/json" });
    console.log(body);
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;
      console.log("CID", cid);
      State.update({
        file: {
          cid,
        },
      });
    });
  } else {
    State.update({
      file: null,
    });
  }
};

const onChangeName = (name) => {
  State.update({
    name,
  });
};

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const thingId = state.name ?? generateUID();

const handleCreate = () => {
  // load in the state.adapter
  // const { create } = VM.require(state.adapter);
  // const hyperfile = create({ cid: state.file.cid });
  // console.log("hyperfile", hyperfile);
  const hyperfile = {
    thing: {
      [thingId]: {
        "": JSON.stringify({
          fileformat: props.fileformat,
          source: "IPFS", // state.source
          adapter: "everycanvas.near/widget/adapter.ipfs", // state.adapter
          reference: {
            cid: state.file.cid,
          },
        }),
        metadata: {
          type: props.type,
        },
      },
    },
  };

  Social.set(hyperfile);
};

return (
  <>
    <textarea
      className="form-control mb-3"
      rows={5}
      value={state.json}
      onChange={(e) => {
        state.json = e.target.value;
        State.update();
      }}
    />
    <a type="button" class="btn btn-success" onClick={() => UploadJson()}>
      Upload
    </a>
    <br />
    {state.file && (
      <div>
        <br />
        Your file:
        <a href={ipfsUrl(state.file.cid)}>{state.file.cid}</a>
        <br />
        {/* <h5 className="mt-3">Name</h5>
        <input
          type="text"
          value={state.name}
          onChange={(e) => onChangeName(e.target.value)}
        /> */}
        <button className="btn btn-outline-success mt-3" onClick={handleCreate}>
          Create
        </button>
      </div>
    )}
  </>
);



// const accountId = context.accountId;

// if (!accountId) {
//   return "please connect your NEAR account";
// }

// const { data, onSubmit } = props;

// const options = [
//   {
//     title: "SocialDB",
//     value: "everycanvas.near/widget/adapter.github",
//   },
//   // {
//   //   title: "GitHub",
//   //   value: "hack.near/widget/adapter.github",
//   // },
//   // {
//   //   title: "Obsidian",
//   //   value: "hack.near/widget/adapter.obsidian",
//   // },
//   // {
//   //   title: "Tldraw",
//   //   value: "hack.near/widget/adapter.tldraw",
//   // },
// ];

// const defaultOption = options[0];

// State.init({
//   source: defaultOption.title,
//   adapter: defaultOption.value,
//   reference: data,
// });

// const Wrapper = styled.div`
//   max-width: 400px;
//   margin: 0 auto;
// `;

// const Form = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// `;

// const Label = styled.label`
//   font-weight: bold;
// `;

// const Input = styled.input`
//   padding: 5px;
// `;

// const Select = styled.select`
//   padding: 8px;
// `;

// const TextArea = styled.textarea`
//   padding: 5px;
//   height: 222px;
//   resize: vertical;
// `;

// const onChangeSource = (source) => {
//   State.update({
//     source,
//   });
// };

// const onChangeAdapter = (adapter) => {
//   State.update({
//     adapter,
//   });
// };

// const onChangeReference = (reference) => {
//   State.update({
//     reference,
//   });
// };

// // function generateUID() {
// //   return (
// //     Math.random().toString(16).slice(2) +
// //     Date.now().toString(36) +
// //     Math.random().toString(16).slice(2)
// //   );
// // }

// // const thingId = generateUID();

// // const handleCreate = () => {
// //   const data = {
// //     thing: {
// //       [thingId]: {
// //         source: state.source,
// //         adapter: state.adapter,
// //         reference: state.reference,
// //       },
// //     },
// //   };

// //   Social.set(data);
// // };

// return (
//   <Wrapper>
//     <h4 className="mb-3">
//       <b>hyperfile creator</b>
//     </h4>
//     <Form>
//       {/* <Label>source</Label>
//       <Input
//         type="text"
//         value={state.source}
//         onChange={(e) => onChangeSource(e.target.value)}
//       /> */}
//       <Label>adapter</Label>
//       <Select
//         placeholder={placeholder}
//         value={state.adapter}
//         onChange={({ target: { value } }) => onChangeAdapter(value)}
//       >
//         {options.map((o) => (
//           <option value={o.value}>{o.title}</option>
//         ))}
//       </Select>

//       <Label htmlFor="reference">reference (JSON)</Label>
//       <TextArea
//         type="text"
//         value={state.reference}
//         onChange={(e) => onChangeReference(e.target.value)}
//       />
//       <button className="btn btn-success mt-3" onClick={() => onSubmit(state)}>
//         create
//       </button>
//     </Form>
//   </Wrapper>
// );