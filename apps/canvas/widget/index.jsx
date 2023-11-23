/**
 * This should be primary view
 */

const path = props.path || "everycanvas.near";

const parts = path.split("/");

if (parts.length === 1) {
  path = `${path}/thing/canvas`;
}

const creatorId = parts[0];

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const handleChangeEvent = (k, v) => {
  
  console.log("handleChangeEvent", k, v);
  // debounce(() => handle["document"].update(projectId, path, { [k]: v })); // deconstructed update
  // type, and then adapter ( I want to update in local storage)
}

// const path = handle["document"].getSelected(projectId);
// const doc = handle["document"].get(path);

// const on = {
//   change: (k, v) => {
//     debounce(() => handle["document"].update(projectId, path, { [k]: v })); // deconstructed update
//     // type, and then adapter ( I want to update in local storage)
//   },
//   publish: () => handle["document"].publish(projectId, path),
// };

// const lastUpdated = doc.metadata.updatedAt;
// const isBuffer = doc._.inBuffer;


// const local = Storage.get("canvas");

// what about when an account doesn't have this?
const hyperfile = JSON.parse(Social.get(path, "final") || "null");
let data; // what is an empty snapshot?

if (hyperfile.adapter) {
  const { get } =
    VM.require(hyperfile.adapter) || (() => {});
  if (get) {
    data = get(hyperfile.reference) || null;
  } else {
    return <p>{`Loading or adapter not found : ${hyperfile.adapter}`}</p>;
  }
}

// // button to select and load a specific canvas.
// // what is the multiples example?

if (!data) {
  return <p>{`Loading or canvas not found : ${hyperfile.adapter}`}</p>;
}


// this can come from user or app settings
const plugins = [
  {
    "hyperfile": {
      src: "everycanvas.near/widget/create.hyperfile",
      description: "able to create hyperfiles",
      layout: "sharezone",
      authors: ["hack.near", "flowscience.near", "efiz.near"]
    }
  },
  {
    "magic": {
      src: "everycanvas.near/widget/magic",
      description: "use open ai",
      layout: "action",
      isModalOpen: true,
      authors: ["petersalomonsen.near"]
    }
  }
]

return (
  <Container key={path}>
    <Canvas
      initialSnapshot={data}
      persistance={path}
      autoFocus={true}
      plugins={plugins}
      handleChangeEvent={handleChangeEvent}
    />
  </Container>
);
