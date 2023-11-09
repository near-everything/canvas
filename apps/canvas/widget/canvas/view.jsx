const { value } = props;

const indices = Social.index("post", "main", {
  order: "desc",
  limit: 100, // this needs to adjust based on slider
  // accountId: props.accounts, // undefined
});

if (!indices) {
  return <p>Loading...</p>;
}

const offsetX = 100; // Horizontal offset for each text shape
const offsetY = 100; // Vertical offset for each text shape
let x = 0; // Initial X position
let y = 0; // Initial Y position

const drawings = indices.map((it, index) => {
  const path = `${it.accountId}/post/main`;
  const blockHeight = it.blockHeight;

  x += offsetX;
  y += offsetY;

  const val = JSON.parse(Social.get(path, blockHeight) || "null");
  return {
    id: `shape:${path}${blockHeight}`,
    type: "text",
    x,
    y,
    props: { text: val.text, align: "start", size: "s" },
  };
});

if (drawings.length === 0) {
  return <p>No drawings yet!</p>;
}

// return <p>{JSON.stringify(drawings)}</p>
return (
  <div style={{ width: "100%", height: "100%" }}>
    <Widget
      src="/*__@appAccount__*//widget/canvas.core"
      props={{ initialShapes: drawings }}
    />
  </div>
);
