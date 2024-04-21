const { path } = props;

const parts = path.split("/");
const creatorId = parts[0];
const thingId = parts[2];

const Button = styled.button`
  background: transparent;
  width: 24px;
  height: 24px;
  border: none;
`;

return (
  <div className="styled-top-bar d-flex align-items-center">
    <Widget
      src="mob.near/widget/N.ProfileLine"
      props={{
        accountId: creatorId,
        tooltip: true,
        hideCheckmark: true,
      }}
    />
    {"/" + thingId}
    <OverlayTrigger
      placement="auto"
      overlay={<Tooltip>{"Copy to clipboard"}</Tooltip>}
    >
      <Button
        onClick={() =>
          clipboard.writeText(
            `https://draw.everything.dev/${context.accountId}${props.location.search}`
          )
        }
      >
        <i className="bi bi-share"></i>
      </Button>
    </OverlayTrigger>
  </div>
);
