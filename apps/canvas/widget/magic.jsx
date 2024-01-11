const systemPrompt = `You are an expert web developer who specializes in inline bootstrap css classes.
A user will provide you with a low-fidelity wireframe of an application. 
You will return a single html file that uses HTML, tailwind css, and JavaScript to create a high fidelity website.
Include any extra CSS and JavaScript in the html file.
If you have any images, load them from Unsplash or use solid colored rectangles.
The user will provide you with notes in blue or red text, arrows, or drawings.
The user may also include images of other websites as style references. Transfer the styles as best as you can, matching fonts / colors / layouts.
They may also provide you with the html of a previous design that they want you to iterate from.
Carry out any changes they request from you.
In the wireframe, the previous design's html will appear as a white rectangle.
For your reference, all text from the image will also be provided to you as a list of strings, separated by newlines. Use them as a reference if any text is hard to read.
Use creative license to make the application more fleshed out.
Use JavaScript modules and unpkg to import any necessary dependencies.

Respond ONLY with the contents of the html file.`;

const {
  shapes,
  getSelectionAsText,
  getSelectionAsImageDataUrl,
  getContentOfPreviousResponse,
  makeEmptyResponseShape,
  populateResponseShape,
} = props;

const Button = styled.button``;

const [text, setText] = useState("");
const [dataUrl, setDataUrl] = useState(null);
const [previousResponse, setPreviousResponse] = useState(null);
const [prompt, setPrompt] = useState(systemPrompt);
const [model, setModel] = useState("gpt-4-vision-preview");
const [messages, setMessages] = useState([]);
const [responseShapeId, setResponseShapeId] = useState([]);
const [response, setResponse] = useState(null);

const convertToText = () => {
  setText(getSelectionAsText());
};

const convertToDataUrl = () => {
  getSelectionAsImageDataUrl()
    .then((data) => {
      console.log(data);
      setDataUrl(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getPreviousResponse = () => {
  setText(getContentOfPreviousResponse());
};

const createMessages = () => {
  const userMessages = [
    {
      type: "text",
      text: "Turn this into a single html file using tailwind.",
    },
  ];

  if (text) {
    userMessages.push({
      type: "text",
      text: text,
    });
  }

  if (dataUrl) {
    userMessages.push({
      type: "image_url",
      image_url: {
        // send an image of the current selection to gpt-4 so it can see what we're working with
        url: dataUrl,
        detail: "high",
      },
    });
  }
  if (previousResponse) {
    userMessages.push({
      type: "text",
      text: previousResponse,
    });
  }

  // combine the user prompt with the system prompt
  setMessages([
    { role: "system", content: prompt },
    { role: "user", content: userMessages },
  ]);
};

const createEmptyShape = () => {
  setResponseShapeId(makeEmptyResponseShape());
};

const updateResponseShape = () => {
  populateResponseShape(responseShapeId, response);
};

return (
  <>
    <h5>selected shapes</h5>
    <textarea style={{ width: "100%" }} value={shapes} disabled />
    <Button onClick={convertToText}>convert to text</Button>
    <textarea style={{ width: "100%" }} value={text} disabled />
    <Button onClick={convertToDataUrl}>convert to image</Button>
    <div className="d-flex">
      {dataUrl && <img src={dataUrl} height={100} width={200} />}
    </div>
    <Button onClick={getPreviousResponse}>get previous response</Button>
    <textarea style={{ width: "100%" }} value={previousResponse} disabled />
    <h5>prompt</h5>
    <textarea
      style={{ width: "100%" }}
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
    />
    <h5>model</h5>
    <select
      style={{ width: "100%" }}
      onChange={(e) => setModel(e.target.value)}
      value={model}
    >
      <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
      <option value="gpt-4">gpt-4</option>
      <option value="gpt-4-vision-preview">gpt-4-vision-preview</option>
    </select>
    <Button onClick={createMessages}>create messages</Button>
    <textarea
      style={{ width: "100%" }}
      value={JSON.stringify(messages)}
      disabled
    />
    <Button onClick={createEmptyShape}>create empty response shape</Button>
    <Widget
      src="everycanvas.near/widget/near-openai"
      props={{ model: model, messages: messages, setResponse: setResponse }}
    />
    <textarea
      style={{ width: "100%" }}
      value={JSON.stringify(response)}
      disabled
    />
    <Button onClick={updateResponseShape}>update response shape</Button>
  </>
);
