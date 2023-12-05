const { shapes, getSelectionAsText } = props;

const Button = styled.button``;

const [text, setText] = useState("");

const convertToText = () => {
  setText(getSelectionAsText());
};

return (
  <>
    <h5>selected shapes</h5>
    <textarea style={{ width: "100%" }} value={shapes} disabled />
    <Button onClick={convertToText}>convert to text</Button>
    <textarea style={{ width: "100%" }} value={text} disabled />
    <Button onClick={convertToText}>convert to image</Button>
    <textarea style={{ width: "100%" }} value={text} disabled />
  </>
);
