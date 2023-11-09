const { value, onChange, onSubmit, onCancel } = props;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  background-color: #f0f0f0;
`;

const EditorContainer = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const Footer = styled.div`
  height: 120px;
  width: 100%;
  background-color: #f0f0f0;
`;

const defaultValue = value;
const language = "json";
const [path, setPath] = useState(props.path || "");

const [code, setCode] = useState(defaultValue);

useEffect(() => {
  onChange && onChange(code);
}, [code]);

function onCreate() {
  const parts = path.split("/");
  Social.set({
    [parts[1]]: {
      [parts[2]]: {
        "": code,
      },
    },
  });
}

return (
  <Container>
    <EditorContainer>
      <Widget
        src="devs.near/widget/MonacoEditor"
        props={{
          path: path,
          onChange: setCode,
          language,
          height: "70vh",
          defaultValue,
        }}
      />
    </EditorContainer>
  </Container>
);
