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

const {
  // these are available to plugins from the ShareZone
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
  path,
} = props;

const [isModalOpen, setModalOpen] = useState(false);

const Button = styled.button`
  padding: 10px 20px;
`;

const toggleModal = () => {
  setModalOpen(!isModalOpen);
};
const parts = path.split("/");
const creatorId = parts[0];

const snapshot = JSON.stringify(getSnapshot());
// we're able to get shapes, getShapePageBounds
// const creatorId = getSnapshot().metadata.creator;

// these two are related, this is almost an entire plugin here

const plugins = [
  {
    button: {
      icon: "bi bi-save",
      label: "save canvas",
    },
    interface: {
      src: "everycanvas.near/widget/create.hyperfile",
      props: {
        // Prop hydration (?)
        creatorId: creatorId, // requester?
        source: "tldraw", // hardcoded Props
        type: "canvas",
        filename: "main",
        data: snapshot, // vs dynamic
      },
    },
    plugins: [ // this can be saved in a widget's metadata
      {
        name: "attribution",
        src: "miraclx.near/widget/Attribution",
        props: {
          dep: true,
          authors: ["hack.near", "flowscience.near"],
        },
      },
    ],
  },
  {
    button: {
      icon: "bi bi-sign-merge-right",
      label: "request merge",
    },
    interface: {
      src: "james.near/widget/update",
      props: {
        data: snapshot,
        src: creatorId, 
        update: "tldraw", 
        type: "canvas",
        filename: "main",
        data: snapshot, // vs dynamic
      },
    },
    plugins: [
      {
        name: "attribution",
        src: "miraclx.near/widget/Attribution",
        props: {
          dep: true,
          authors: ["james.near"],
        },
      },
    ],
  },
];

return (
  <>
    {context.accountId && (
      <Button className="classic" onClick={toggleModal}>
        {context.accountId === creatorId ? ( // plugin buttons
          <>
            <i className="bi bi-save" />
            save canvas
          </>
        ) : (
          <>
            <i className="bi bi-sign-merge-right" />
            request merge
          </>
        )}
      </Button>
    )}
    {isModalOpen && (
      <Modal onClose={toggleModal}>
        {/* This is hardcoded, need to turn into a plugin */}
        <div className="w-100">
          <Widget
            src="/*__@appAccount__*//widget/create.hyperfile" // selected plugin
            props={{
              data: snapshot,
              source: "tldraw",
              type: "canvas",
              filename: "main",
              creatorId: creatorId,
            }}
          />
        </div>
        {/* Attributions should be a plugin */}
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ dep: true, authors: ["hack.near", "flowscience.near"] }}
        />
      </Modal>
    )}
  </>
);
