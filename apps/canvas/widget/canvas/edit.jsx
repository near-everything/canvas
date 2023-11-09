const { value, onChange, onSubmit, onCancel, path } = props;

const [initialShapes, setInitialShapes] = useState([]);

useEffect(() => {
  if (typeof value === "string") {
    setInitialShapes([
      {
        id: `shape:editor`,
        type: "text",
        props: { text: value, align: "start", size: "s" },
      },
    ]);
  }
}, [value, setInitialShapes]);

{/* <button onClick={getDataFromChild}>Get Data From Child</button>;
{
  canvasData && <p>Data from child: {canvasData}</p>;
} */}

return (
  <div style={{ display: "flex" }}>
    <div style={{ width: "60vw", height: "80vh" }}>
      <Canvas
        initialShapes={initialShapes}
        persistanceKey={path}
        // onSave={handleSave}
      />
    </div>
  </div>
);
