/**
 * This should be primary view
 */

const path = props.path || context.accountId;

if (path.length === 1) {
  path = `${path}thing/canvas`;
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const data = useMemo(() => JSON.parse(Social.get(path, "final") || "null"));

if (!data) {
  console.log("canvas not found: ", path);
  data = {};
}

return (
  <Container key={path}>
    <Canvas
      initialSnapshot={data || {}}
      persistance={path}
      autoFocus={true}
    />
  </Container>
);
