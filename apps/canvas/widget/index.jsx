/**
 * This should be primary view
 */

const path = props.path || context.accountId || "everycanvas.near";

const parts = path.split("/");

if (parts.length === 1) {
  path = `${path}/canvas/main`;
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
  const { get } = VM.require(hyperfile.adapter) || (() => {}); // this is like getting data from the remote
  if (get) {
    data = get(hyperfile.reference) || null;
    // get ref from local storage
    // if ref in local storage is !== to current, then we want to merge
    // old and new snapshot
  } else {
    return <p>{`Loading or adapter not found : ${hyperfile.adapter}`}</p>;
  }
} else {
  return (
    <Container key={path}>
      <Canvas persistance={path} autoFocus={true} />
    </Container>
  );
}

if (!data) {
  return <p>{`Loading or canvas not found : ${hyperfile.adapter}`}</p>;
}

return (
  <Container key={path}>
    <Canvas initialSnapshot={data} persistance={path} autoFocus={true} />
  </Container>
);
