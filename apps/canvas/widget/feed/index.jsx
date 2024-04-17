// Feed
const type = props.type || "canvas";

const things = Social.keys(`*/${type}/*`, "final", {
  return_type: "BlockHeight",
});

if (!things) {
  return "Loading...";
}

const Container = styled.div`
  margin: 23px;
  padding: 19px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (min-width: 576px) {
    grid-gap: 15px;
  }

  @media (min-width: 992px) {
    grid-gap: 20px;
  }

  > * {
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.03);
    }
  }
`;

const processData = useCallback(
  (data) => {
    const accounts = Object.entries(data);

    const allItems = accounts
      .map((account) => {
        const accountId = account[0];
        return Object.entries(account[1][type]).map((kv) => {
          return {
            accountId,
            type: type,
            name: kv[0],
            metadatadata: Social.get(
              `${accountId}/${type}/${kv[0]}/metadata/**`,
              "final"
            ),
          };
        });
      })
      .flat();

    allItems.sort((a, b) => b.blockHeight - a.blockHeight);
    return allItems;
  },
  [type]
);

const items = processData(things);

if (!items) {
  return "Loading data...";
}

if (items.length === 0) {
  return `No items of type: "${type}" found.`;
}

function Item({ accountId, name, type, metadata }) {
  const displayName = metadata.name || name;
  const defaultImage =
    "https://ipfs.near.social/ipfs/bafkreihi3qh72njb3ejg7t2mbxuho2vk447kzkvpjtmulsb2njd6m2cfgi";

  const profile = Social.getr(`${accountId}/profile`);
  return (
    <div
      className="card position-relative"
      style={{
        paddingBottom: "20px",
      }}
    >
      <Link style={{ textDecoration: "none" }} to={`/${accountId}`}>
        <div
          style={{
            maxWidth: "100%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {profile.backgroundImage ? (
            <Widget
              src="mob.near/widget/Image"
              props={{
                image: profile.backgroundImage || defaultImage,
                className: "card-img-top",
                style: {
                  backgroundImage: `url(${defaultImage})`,
                  height: "90px",
                  backgroundSize: "cover",
                  objectFit: "cover",
                  backgroundPosition: "center",
                },
              }}
            />
          ) : (
            <div
              className="card-img-top"
              style={{
                backgroundImage: `url(${defaultImage})`,
                height: "90px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

          <div className="card-body">
            <Widget
              src="hack.near/widget/profile.builder"
              props={{ accountId }}
            />
            {metadata.description && (
              <p
                className="card-text"
                style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {metadata.description}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div
        className="d-flex flex-row justify-content-between position-absolute "
        style={{
          width: "100%",
          gap: "5rem",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div className="p-3">
          <Link to={`/${accountId}`}>{displayName}</Link>
        </div>
        {context.accountId && (
          <div
            className="p-3 d-flex flex-row"
            style={{
              gap: "0.5rem",
            }}
          >
            <Widget
              src="mob.near/widget/N.StarButton"
              props={{
                notifyAccountId: accountId,
                item: {
                  type: "social",
                  path: `${accountId}/${type}/${name}`,
                },
              }}
            />
            <Widget
              src="mob.near/widget/N.LikeButton"
              props={{
                notifyAccountId: accountId,
                item: {
                  type: "social",
                  path: `${accountId}/${type}/${name}`,
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

return (
  <Container>
    <div className="d-flex justify-content-between align-items-center m-1">
      <h3 className="mb-3">every {type}</h3>
      <div className="mb-2">
        <Link to={"/"} className="btn btn-sm btn-warning">
          <i className="bi bi-stars" /> <b>ideate</b>
        </Link>
      </div>
    </div>
    <Widget
      src="everycanvas.near/widget/ItemFeed"
      props={{
        items: items,
        renderItem: Item,
        perPage: 100,
        renderLayout: (items) => <Grid>{items}</Grid>,
      }}
    />
  </Container>
);
