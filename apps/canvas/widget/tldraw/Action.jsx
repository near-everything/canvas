/**
 * Modal can be moved to its own module
 */
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalBox = styled.div`
  background: white;
  min-width: 400px;
  max-width: 600px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1002;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  float: right;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  padding: 10px;
`;

function Modal({ onClose, children }) {
  return (
    <ModalBackdrop>
      <ModalBox>
        <ModalHeader>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalBox>
    </ModalBackdrop>
  );
}

const StyledActionButton = styled.div`
  position: fixed;
  z-index: 290;
  border-radius: 50%;
  cursor: pointer;
  background: radial-gradient(circle at 30% 30%, #4a4949, #000000);

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06),
    0px 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease; // smooth transition

  &:hover {
    background: radial-gradient(circle at 70% 30%, #4a4949, #000000);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    transform: scale(0.98) translateY(4px); // scale down slightly and move downward
  }

  &:active {
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.2);
    transform: scale(0.96) translateY(6px); // more scale down and more downward movement for click
  }

  /* Desktop and Tablet */
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
    right: 30px;
    bottom: 50px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    width: 100px;
    height: 100px;
    right: 15px;
    bottom: 110px;
  }
`;

const [isModalOpen, setModalOpen] = useState(false);
const [activePluginId, setActivePluginId] = useState("openai");

const toggleModal = () => {
  setModalOpen(!isModalOpen);
};

const Button = styled.button`
  // this could take in theme
  padding: 10px 20px;
`;

const {
  path,
  getSelectedShapes,
  getSnapshot,
  getSelectionAsText,
  getSelectionAsImageDataUrl,
  getContentOfPreviousResponse,
  makeEmptyResponseShape,
  populateResponseShape,
} = props;

const parts = path.split("/");
const creatorId = parts[0];

const snapshot = getSnapshot();
const selectedShapes = getSelectedShapes();

const plugins = [
  {
    id: "openai",
    interface: {
      src: "everycanvas.near/widget/magic",
      props: {
        shapes: JSON.stringify(selectedShapes),
        getSelectionAsText: getSelectionAsText,
        getSelectionAsImageDataUrl: getSelectionAsImageDataUrl,
        getContentOfPreviousResponse: getContentOfPreviousResponse,
        makeEmptyResponseShape: makeEmptyResponseShape,
        populateResponseShape: populateResponseShape
      },
      attribution: ["petersalomonsen.near"], // this should come from widget metadata
    },
  },
];

const activePlugin = plugins.find((plugin) => plugin.id === activePluginId);

return (
  <>
    <StyledActionButton onClick={toggleModal} />
    {isModalOpen && (
      <Modal onClose={toggleModal}>
        <div className="w-100">
          <Widget
            src={activePlugin.interface.src}
            props={activePlugin.interface.props}
          />
        </div>
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ dep: true, authors: activePlugin.interface.attribution }}
        />
      </Modal>
    )}
  </>
);
