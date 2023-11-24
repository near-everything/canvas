const { createShape } = props;

const [src, setSrc] = useState("");

return (
  <div className="p-3 d-flex align-items-end gap-1">
    <div className="d-flex flex-column mr-2 w-100">
      <label htmlFor="widgetPath" className="mb-2">
        Provide a widget src:
      </label>
      <input
        type="text"
        id="widgetPath"
        className="form-control"
        value={src}
        onChange={(e) => setSrc(e.target.value)}
      />
    </div>
    <button
      className="btn btn-primary"
      onClick={() => {
        console.log("clicked");
        createShape(src);
      }}
    >
      <i className="bi bi-download" />
    </button>
  </div>
);