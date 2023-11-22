/**
 * This is the widget in the ActionButton
 *
 * It receives a trigger(?) and data to interact on
 */
// const ModalBackdrop = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1001;
// `;

// const ModalBox = styled.div`
//   background: white;
//   min-width: 400px;
//   max-width: 600px;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
//   z-index: 1002;
// `;

// const ModalHeader = styled.div`
//   display: flex;
//   justify-content: end;
//   align-items: center;
// `;

// const CloseButton = styled.button`
//   background: #f44336;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding: 10px 15px;
//   cursor: pointer;
//   float: right;
// `;

// const ModalContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-width: 300px;
//   padding: 10px;
// `;

// function Modal({ onClose, children }) {
//   return (
//     <ModalBackdrop>
//       <ModalBox>
//         <ModalHeader>
//           <CloseButton onClick={onClose}>Close</CloseButton>
//         </ModalHeader>
//         <ModalContent>{children}</ModalContent>
//       </ModalBox>
//     </ModalBackdrop>
//   );
// }

// const { // these are available to plugins from the ActionButton
//   getSelectedShapes,
//   getSnapshot,
//   deleteShapes,
//   getShapePageBounds,
//   createShapeId,
//   createShape,
//   updateShape,
//   asSvg,
//   asPng,
//   asDataUrl,
// } = props;

// const { plugin } = props;

// const [isModalOpen, setModalOpen] = useState(false);

// const Button = styled.button`
//   padding: 10px 20px;
// `;

// const toggleModal = () => {
//   setModalOpen(!isModalOpen);
// };

// // these two are related, this is almost an entire plugin here
// return (
//   <>
//     {isModalOpen && (
//       <Modal onClose={toggleModal}>
//         <div className="w-100">
//           <Widget
//             src={plugins.src}
//             props={{

//             }}
//           />
//         </div>
//         {/* Attributions should be a plugin */}
//         <Widget
//           src="miraclx.near/widget/Attribution"
//           props={{ dep: true, authors: plugin.authors }}
//         />
//       </Modal>
//     )}
//   </>
// );

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
      prompt:
        "You are an expert web developer who specializes in tailwind css...",
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
      <Button onClick={() => setIsCollapsed(!isCollapsed)}>
        text only
      </Button>
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
