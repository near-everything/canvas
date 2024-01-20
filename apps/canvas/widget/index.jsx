/**
 * This should be primary view
 */

const path = props.path || context.accountId || "every.near";

const parts = path.split("/");

if (parts.length === 1) {
  path = `${path}/canvas/main`;
}

const creatorId = parts[0];

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const hyperfile = JSON.parse(Social.get(path, "final") || "null");
let data;

if (hyperfile.adapter) {
  const { get } = VM.require(hyperfile.adapter) || (() => {});
  if (get) {
    data = get(hyperfile.reference) || null;
  } else {
    return (
      <p>{`Data not found from reference: ${hyperfile.reference} and adapter: ${hyperfile.adapter}`}</p>
    );
  }
} else {
  console.log(`Invalid data: ${hyperfile}`);
  return (
    <Container key={path}>
      <Canvas persistance={path} autoFocus={true} />
    </Container>
  );
}

if (creatorId === context.accountId) {
  // use local persistance
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
