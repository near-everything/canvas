const items = props.items;
const renderItem =
  props.renderItem ||
  ((item) => <div key={JSON.stringify(item)}>{JSON.stringify(item)}</div>);
const perPage = props.perPage || 10;
const renderLoading = props.renderLoading || (
  <div className="loader">Loading ...</div>
);
const renderLayout = props.renderLayout || ((items) => items);

const jItems = JSON.stringify(items);
if (state.jItems !== jItems) {
  State.update({
    widgets: 0,
    jItems,
  });
}

const makeMoreItems = () => {
  State.update({
    widgets: state.widgets + perPage,
  });
};

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={makeMoreItems}
    hasMore={state.widgets < items.length}
    loader={renderLoading}
  >
    {renderLayout(
      items
        .slice(0, state.widgets)
        .map((item) => <div key={JSON.stringify(item)}>{renderItem(item)}</div>)
    )}
  </InfiniteScroll>
);
