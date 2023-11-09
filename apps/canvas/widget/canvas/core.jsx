const { initialShapes, hideUi } = props;

const [hide, setHide] = useState(false);

return (
  <>
    <button onClick={() => setHide(!hide)}>Toggle UI</button>
    <Canvas initialShapes={initialShapes} hideUi={hide} />
  </>
);
