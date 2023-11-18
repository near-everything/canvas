const {
  selectedShapes,
  selectedShapeIds,
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
  console.log("hello!");
  Social.set({
    thing: {
      canvas: selectedShapes,
    },
  });
};

return (
  <button className="classic" onClick={save}>
    save canvas
  </button>
);
