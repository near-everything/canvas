const { snapshot, trigger, handleDataFromChild } = props;

return (
  <Canvas
    initialSnapshot={snapshot}
    trigger={trigger}
    onGetData={handleDataFromChild}
  />
);
