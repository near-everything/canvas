const Wrapper = styled.div`
  max-width: 400px;
  margin: 1rem auto;
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  gap: 5px;
`;

const Statistics = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f3f3f3;
  border-radius: 5px;
`;

const handlePost = () => {
  Social.set({
    post: {
      main: JSON.stringify({})
    },
    index: {
      post: JSON.stringify({
        key: "main",
        value: JSON.stringify({})
      })
    }
  })
};

const shapes = JSON.parse(props.shapes ?? "[]");

const calculateStatistics = (shapesData) => {
  const initialStats = {
    typeCounts: {},
    totalPosition: { x: 0, y: 0 },
    count: 0
  };

  const stats = shapesData.reduce((accumulator, shape) => {
    // Count types
    accumulator.typeCounts[shape.type] = (accumulator.typeCounts[shape.type] || 0) + 1;

    // Sum positions
    accumulator.totalPosition.x += shape.x;
    accumulator.totalPosition.y += shape.y;

    // Increment count for average calculation
    accumulator.count++;

    return accumulator;
  }, initialStats);

  // Calculate averages
  const averagePosition = {
    x: stats.totalPosition.x / stats.count,
    y: stats.totalPosition.y / stats.count
  };

  return {
    typeCounts: stats.typeCounts,
    averagePosition: averagePosition
  };
};

const stats = calculateStatistics(shapes);

return (
  <Wrapper>
    <h3>post shapes</h3>
    <FormGroup>
      <Label>shapes</Label>
      <textarea className="form-control mb-3" rows={5} value={shapes} />
    </FormGroup>
    <Statistics>
      <p>
        <strong>Types of Shapes:</strong> {JSON.stringify(stats.typeCounts)}
      </p>
      <p>
        <strong>Average Position:</strong> X:{" "}
        {stats.averagePosition.x.toFixed(2)}, Y:{" "}
        {stats.averagePosition.y.toFixed(2)}
      </p>
      {/* Display other stats */}
    </Statistics>
    <FormGroup>
      <button className="btn btn-success" onClick={handlePost}>
        Post
      </button>
    </FormGroup>
  </Wrapper>
);
