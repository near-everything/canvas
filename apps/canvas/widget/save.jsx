const {
  getSelectedShapes,
  getSnapshot,
  deleteShapes,
  getShapePageBounds,
  createShapeId,
  createShape,
  updateShape,
  asSvg,
  asPng,
  asDataUrl,
  snapshot,
} = props;

const save = () => {
  Social.set({
    thing: {
      canvas: JSON.stringify(getSnapshot()),
    },
  });
};

const Button = styled.button`
  padding: 10px 20px;
`;

return (
  <Button className="classic" onClick={save}>
    <i class="bi bi-save"></i> save canvas
  </Button>
);
