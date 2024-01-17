/*
---props---

path: string,
count(count: number)?: function,

*/

if (typeof props.path !== "string") return "send {path} as string in props";

State.init({
  selectedTab: "code",
  selectedBlockHeight: null,
});

const historyBlocksRequest = Social.keys(`${props.path}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [accountId, type, name] = props.path.split("/");

let blocksChanges = historyBlocksRequest[accountId]?.[type]?.[name];

if (props.count) props.count(blocksChanges.length);

if (blocksChanges) blocksChanges = blocksChanges?.sort((a, b) => b - a);

if (!state.selectedBlockHeight) state.selectedBlockHeight = blocksChanges[0];

function getDatastringFromBlockHeight(blockHeight) {
  const block = Near.block(blockHeight);
  const date = new Date(block.header.timestamp_nanosec / 1e6);
  return date.toDateString() + " " + date.toLocaleTimeString();
}

const oldVersion = useMemo(() => {
  const current = Social.get(props.path, state.selectedBlockHeight);
  return current;
}, [state.selectedBlockHeight]);

const handleRevert = () => {
  if (props.onRevert) {
    props.onRevert(oldVersion);
  } else {
    Social.set({
      [name]: {
        [type]: oldVersion,
      },
    });
  }
};

const renderBlockChangesLink = (blockHeight) => {
  return (
    <div>
      <button
        className={`list-group-item list-group-item-action ${
          state.selectedBlockHeight != blockHeight ? "" : "list-group-item-info"
        }`}
        onClick={() => {
          State.update({ selectedBlockHeight: blockHeight });
        }}
      >
        #{blockHeight} * {getDatastringFromBlockHeight(blockHeight)}
      </button>
    </div>
  );
};

function blockHeightToCode(blockHeight) {
  const index = blocksChanges.findIndex((el) => el == blockHeight);
  return (
    <div className="mb-3">
      <Widget
        key={blockHeight}
        src={"everycanvas.near/widget/History.CodeHistoryCard"}
        props={{
          pathToWidget: props.path,
          currentBlockHeight: blockHeight,
          prevBlockHeight: blocksChanges[index + 1],
        }}
      />
    </div>
  );
}

function blockHeightToRender(blockHeight) {
  return (
    <Widget
      style={{ minHeight: "200px" }}
      key={blockHeight}
      src={"every.near/widget/thing"}
      props={{
        path: props.path,
        blockHeight: blockHeight,
      }}
    />
  );
}

//styles forked from calebjacob.near/widget/Activity
const Tabs = styled.div`
  display: flex;
  padding: 0 12px;
  height: 48px;
  border-bottom: 1px solid #eceef0;
`;

const TabsButton = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 12px;
    right: 12px;
    height: 3px;
    background: #0091ff;
  }
`;

return (
  <div>
    {!blocksChanges ? (
      <div>incorrent path</div>
    ) : (
      <div>
        <div div className="card mb-3">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <h3>{blocksChanges.length} Commits </h3>
              {state.selectedBlockHeight &&
                blocksChanges[0] !== state.selectedBlockHeight && (
                  <button type="button" onClick={handleRevert}>
                    Revert
                  </button>
                )}
            </div>
          </div>

          <div className="list-group">
            {blocksChanges
              .slice(0, 5)
              .map((height) => renderBlockChangesLink(height))}

            <div className="collapse" id="collapseExample">
              {blocksChanges
                .slice(5)
                .map((height) => renderBlockChangesLink(height))}
            </div>

            {blocksChanges.length > 5 && (
              <button
                className="list-group-item active"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Show all
              </button>
            )}
          </div>
        </div>

        <Tabs>
          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "code",
              })
            }
            selected={state.selectedTab == "code"}
          >
            Code
          </TabsButton>

          <TabsButton
            type="button"
            onClick={() =>
              State.update({
                selectedTab: "render",
              })
            }
            selected={state.selectedTab == "render"}
          >
            Render
          </TabsButton>
        </Tabs>

        {state.selectedTab == "code" && (
          <div>{blockHeightToCode(state.selectedBlockHeight)}</div>
        )}

        {state.selectedTab == "render" && (
          <div>{blockHeightToRender(state.selectedBlockHeight)}</div>
        )}
      </div>
    )}
  </div>
);
