
const { loadSnapshot, path } = props;

State.init({
  src: path ?? "", 
});

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
      }}
    />
  </div>
);

return <button onClick={loadSnapshot} />