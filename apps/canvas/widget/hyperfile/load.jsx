const { loadSnapshot, path } = props;

State.init({
  src: path ?? "",
});

function onRevert(v) {
  console.log("reverting", v)
  if (v.adapter) {
    console.log("adapter", v.adapter);
    const { get } = VM.require(v.adapter) || {
      get: (v) => console.log("no get: ", v),
    };
    if (get) {
      loadSnapshot(get(v.reference));
    }
  } else {
    console.log("no adapter", v.adapter);
  }
}

return (
  <div>
    <h1 class="text-center">History</h1>

    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder={path}
        defaultValue={state.src || path}
        onBlur={(e) => {
          State.update({
            src: e.target.value,
          });
        }}
      />
    </div>

    <Widget
      src={"everycanvas.near/widget/History"}
      props={{
        path: state.src,
        onRevert: onRevert,
      }}
    />
  </div>
);
