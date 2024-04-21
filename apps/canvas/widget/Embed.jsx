const Wrapper = styled.div`
  margin: 0 auto;
  font-size: 1rem;

  h3 {
    text-transform: capitalize;
  }

  button {
    background: #2f80ed;
    text-shadow: none !important;
    color: white;
    border-radius: 8px !important;
    margin: 1rem 0;
  }
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
      <div className="form-group">
        <input
          placeholder="Path"
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </div>
    </Form>
    <FormGroup>
      <button
        style={{ color: "white" }}
        className="btn btn-primary"
        onClick={handleEmbed}
      >
        Submit
      </button>
    </FormGroup>
  </Wrapper>
);
