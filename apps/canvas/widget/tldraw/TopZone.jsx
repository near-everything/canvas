const { path } = props;

const parts = path.split("/");
const creatorId = parts[0];
const thingId = parts[2];

return (
  <div className="mt-1">
    <Widget
      src="mob.near/widget/N.ProfileLine"
      props={{
        accountId: creatorId,
        tooltip: true,
        hideCheckmark: true
      }}
    />{"/" + thingId}
  </div>
);
