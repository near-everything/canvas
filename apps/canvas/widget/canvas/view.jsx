const { value, onChange, onSubmit, onCancel, selectedSource } = props;

let drawings = [];

let indices = [];

if (selectedSource) {
  switch (selectedSource) {
    case "canvas":
      indices = Social.index(
        "post",
        {
          // thing
          type: "thing",
          path: "efiz.near/thing/draw", // this is the page??
        },
        {
          order: "desc",
          limit: 100, // this needs to adjust based on slider
          // accountId: props.accounts, // undefined
        }
      );

      if (!indices) {
        return <p>Loading...</p>;
      }

      drawings = indices
        .map((it) => {
          const path = `${it.accountId}/post/main`;
          const blockHeight = it.blockHeight;

          const val = JSON.parse(Social.get(path, blockHeight) || "null");
          return val.content.shapes ? val.content.shapes : [];
        })
        .flat();
      break;
    case "feed":
      indices = Social.index("post", "main", {
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

      drawings = indices.map((it, index) => {
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
      break;
  }
}

if (drawings.length === 0) {
  return <p>No drawings yet!</p>;
}

// const [initialShapes, setInitialShapes] = useState([]);

// useEffect(() => {
//   if (typeof value === "string") {
//     setInitialShapes([
//       {
//         id: `shape:editor`,
//         type: "text",
//         props: { text: value, align: "start", size: "s" },
//       },
//     ]);
//   }
// }, [value, setInitialShapes]);

return (
  <Widget
    src="/*__@appAccount__*//widget/canvas.core"
    props={{ initialShapes: drawings }}
  />
);
