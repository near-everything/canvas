const { handleItemClick } = props;

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const StyledItem = styled.div`
  display: flex;
  border-radius: 8px;
  background-color: var(--base100);
  padding: 10px;
  width: 100%;
  margin: 5px 0;
  cursor: pointer;
  &:hover {
    background-color: var(--base50);
  }
`;

const ImageWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Name = styled.div`
  flex: 1;
  align-self: center;
`;

const [selectedType, setSelectedType] = useState("widget");

const items = Social.keys(`${context.accountId}/${selectedType}/*`, "final");

if (!items) {
  return <div>No items found</div>;
}

items = Object.keys(items[context.accountId][selectedType]);

return (
  <Container>
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
    >
      <option value="widget">Widget</option>
      <option value="thing">Thing</option>
      <option value="type">Type</option>
    </select>
    {items.map((item, index) => (
      <StyledItem
        key={index}
        onClick={() =>
          handleItemClick(`${context.accountId}/${selectedType}/${item}`)
        }
      >
        {/* <ImageWrapper>
          <Image src={item.metadata.image.href} alt={item.metadata.name} />
        </ImageWrapper> */}
        <Name>{item}</Name>
      </StyledItem>
    ))}
  </Container>
);
