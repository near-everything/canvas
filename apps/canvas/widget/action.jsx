/**
 * This is the widget in the ActionButton
 *
 * It receives a trigger(?) and data to interact on
 */

const {
  // these are available to plugins from the ActionButton
  adapter,
  closeModal,
} = props;


const [selectedAgent, setSelectedAgent] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleRunAgent = async () => {
    // Use selectedAgent and prompt to interact with the AI agent
    const response = await runAgent(selectedAgent, prompt);

    // Access SVG, text content, or other properties through the adapter
    const svg = await adapter.getSelectionAsImageDataUrl();
    const textContent = adapter.getSelectionAsText();
    // ...access other properties as needed

    // Do something with the response and accessed data
  };

  return (
    <div>
      <h2>AI Agent Runner</h2>
      <label>
        Select Agent:
        <select value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)}>
          {/* Populate available agents */}
          <option value="agent1">Agent 1</option>
          <option value="agent2">Agent 2</option>
          {/* ...add more agents */}
        </select>
      </label>
      <label>
        Enter Prompt:
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      <button onClick={handleRunAgent}>Run Agent</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );



// get plugins

// const activePlugin = "everycanvas.near/widget/plugin.NearOpenAI";

const Container = styled.div`
  width: 100%;
`;

const Section = styled.div`
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
`;

const options = [
  {
    label: "Tailwind & HTML",
    value: {
      prompt: `You are an expert web developer who specializes in tailwind css.
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
      
      Respond ONLY with the contents of the html file.`,
      model: "gpt-4-vision-preview",
    },
  },
  {
    label: "Widget",
    value: {
      prompt:
        "You are an expert web developer who specializes in tailwind css and you put this HTML in a near-bos-webcomponent...",
      model: "gpt-4-vision-preview",
    },
  },
];

const [inputData, setInputData] = useState(props.data ?? "");
const [selectedOption, setSelectedOption] = useState({});
const [isCollapsed, setIsCollapsed] = useState(true);
const [loading, setLoading] = useState(false);

const handleSelectChange = (e) => {
  const selected = options.find((option) => option.label === e.target.value);
  setSelectedOption(selected ? selected.value : { model: "", prompt: "" });
};

const handleSubmit = async () => {
  setLoading(true);
  // Implement your async call here
  // After completing the async call, set loading to false
};

return (
  <Container>
    <Section>
      <Button onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "show raw" : "hide raw"}
      </Button>
      {!isCollapsed && (
        <Textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      )}
    </Section>
    <Section>
      <Button onClick={() => setIsCollapsed(!isCollapsed)}>text only</Button>
      {!isCollapsed && (
        <Textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      )}
    </Section>
    <Section>
      <Select onChange={handleSelectChange} defaultValue="">
        <option value="" disabled>
          Choose an option
        </option>
        {options.map((option) => (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        ))}
        <option value="custom">Custom</option>
      </Select>
      {selectedOption.model !== undefined && (
        <>
          <Textarea
            value={selectedOption.model}
            onChange={(e) =>
              setSelectedOption({ ...selectedOption, model: e.target.value })
            }
          />
          <Textarea
            value={selectedOption.prompt}
            onChange={(e) =>
              setSelectedOption({ ...selectedOption, prompt: e.target.value })
            }
          />
        </>
      )}
    </Section>
    <Section>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
    </Section>
  </Container>
);
