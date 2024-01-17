State.init({});

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

let CodeWrapper = styled.div`
& > pre > div {
  margin: 0px !important;
}

& > pre {
  margin: 0px !important;
  border-radius: 0px 0px 5px 5px;
}
`;

return (
  <div className="card border-primary">
    <div className="card-header">
      <small className="text-muted">
        <div className="row justify-content-between">
          <div className="col-4 d-flex frex-row justify-content-start align-items-center">
            <div className="p-2">changes in block #{props.currentBlockHeight}</div>

            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>count inserted lines</Tooltip>}
            >
              <span className="badge text-bg-success p-2 me-1 align-self-center">
                {state.lineCountInserted}
              </span>
            </OverlayTrigger>

            <OverlayTrigger
              placement="auto"
              overlay={<Tooltip>count deleted lines</Tooltip>}
            >
              <span className="badge text-bg-danger p-2 me-1 align-self-center">
                {state.lineCountDeleted}
              </span>
            </OverlayTrigger>
          </div>

          <div className="col-7 d-flex justify-content-end align-items-center">
            {getDatastringFromBlockHeight(props.currentBlockHeight)}
          </div>
        </div>
      </small>
    </div>

    <CodeWrapper>
      <Widget
        src={`bozon.near/widget/WidgetHistory.CodeHistory`}
        props={{
          pathToWidget: props.pathToWidget,
          currentBlockHeight: props.currentBlockHeight,
          prevBlockHeight: props.prevBlockHeight,
          findUniqueResult: (
            lineCountDeleted,
            lineCountInserted,
            lineCountCurrentCode,
            lineCountPrevCode,
            allLineCount
          ) => {
            if (
              state.lineCountDeleted === undefined ||
              state.lineCountInserted === undefined
            )
              State.update({ lineCountDeleted, lineCountInserted });
          },
        }}
      />
    </CodeWrapper>
  </div>
);
