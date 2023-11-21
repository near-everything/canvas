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

return (
  <Container key={path}>
    <Canvas
      initialSnapshot={data}
      persistance={path}
      autoFocus={true}
      showAction={context.accountId} // plugins object?
    />
  </Container>
);
