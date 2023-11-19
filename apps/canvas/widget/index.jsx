/**
 * This should be primary view
 */

const path = props.path || context.accountId || "everycanvas.near";

const parts = path.split("/");

if (parts.length === 1) {
  path = `${path}/thing/canvas`;
}

const creatorId = parts[0];

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const data = JSON.parse(Social.get(path, "final") || "null");

if (!data) {
  console.log("canvas not found: ", path);
  // how to tell between not found and loading?
  return (
    <div>
      <p>Loading...</p>
      <p>I don't really have a way to tell between a canvas being found or still loading</p>
      <p>If you're lost, maybe go <Link to="/">home</Link>.</p>
    </div>
  );
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
