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

const {
  getSelectedShapes,
  getSnapshot,
  deleteShapes,
  getShapePageBounds,
  createShapeId,
  createShape,
  updateShape,
  asSvg,
  asPng,
  asDataUrl,
  snapshot,
} = props;

const [isModalOpen, setModalOpen] = useState(false);

const save = () => {
  Social.set({
    thing: {
      canvas: {
        "": JSON.stringify(getSnapshot()),
        metadata: {
          type: "canvas"
        }
      },
    },
  });
};

const Button = styled.button`
  padding: 10px 20px;
`;

const toggleModal = () => {
  setModalOpen(!isModalOpen);
};

return (
  <>
    <Button className="classic" onClick={save}>
      <i class="bi bi-save"></i> save canvas
    </Button>
    {isModalOpen && (
      <Modal onClose={toggleModal}>
        <Widget src="hack.near/widget/create.hyperfile" />
        <button onClick={save}>save</button>
      </Modal>
    )}
  </>
);
