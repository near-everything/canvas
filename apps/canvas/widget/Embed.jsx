const Wrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const TabContent = styled.div`
  margin-top: 1rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const Select = styled.select`
  padding: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const { makeEmptyResponseShape, populateResponseShape } = props;

const Button = styled.button``;

const [path, setPath] = useState(props.path ?? "");

const handleEmbed = () => {
  const responseShapeId = makeEmptyResponseShape();
  console.log("created response shape", responseShapeId);
  populateResponseShape(responseShapeId, path);
};

return (
  <Wrapper>
    <h3>embed</h3>
    <Form>
      <FormGroup>
        <Label>path</Label>
        <Input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </FormGroup>
    </Form>
    <FormGroup>
      <button className="btn btn-success m-2" onClick={handleEmbed}>
        Submit
      </button>
    </FormGroup>
  </Wrapper>
);
