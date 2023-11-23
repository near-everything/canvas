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
  updateShape,
  asSvg,
  asPng,
  asDataUrl,
  shape,
  setModalOpen,
} = props;


const Button = styled.button`
  padding: 10px 20px;
`;

const toggleModal = () => {
  setModalOpen(!isModalOpen);
};

const [activePlugin, setActivePlugin] = useState("SAVE_CANVAS");

const plugins = [
  {
    name: "load",
    icon: "bi bi-download",
    title: "load ",
    onClick: () => {
      toggleModal();
      setActivePlugin("LOAD_WIDGET");
    },
    modal: "LOAD_WIDGET",
    needsAuth: false,
    module: {
      src: "/*__@appAccount__*//widget/plugin.LoadWidget",
      props: {
        createShape: (v) => {
          console.log("createShape", v);
          // updateShape({ ...(shape || {}), props: v });
        },
      },
    },
    authors: ["efiz.near"],
  },
  {
    name: "save",
    icon: "bi bi-save",
    title: "save ",
    onClick: () => {
      toggleModal();
      setActivePlugin("SAVE_CANVAS");
    },
    modal: "SAVE_CANVAS",
    needsAuth: true,
    module: {
      src: "/*__@appAccount__*//widget/create.hyperfile",
      props: {
        data: JSON.stringify(getSnapshot()),
        source: "tldraw",
        type: "canvas",
        filename: "canvas",
      },
    },
    authors: ["hack.near", "flowscience.near", "efiz.near"],
  },
];

function Plugin({ activePlugin }) {
  const plugin = plugins.find((p) => p.modal === activePlugin);
  return (
    <>
      <Widget src={plugin.module.src} props={plugin.module.props} />
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{ dep: true, authors: plugin.authors }}
      />
    </>
  );
}

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`;

// these two are related, this is almost an entire plugin here
return (
  <>
    <ButtonRow>
      {plugins.map(
        (plugin) =>
          (!plugin.needsAuth || (plugin.needsAuth && context.accountId)) && (
            <Button
              className="classic"
              onClick={plugin.onClick}
              key={plugin.name}
            >
              <i className={plugin.icon}></i> {plugin.title}
            </Button>
          )
      )}
    </ButtonRow>
    {isModalOpen && (
      <Modal onClose={toggleModal}>
        <div className="w-100">
          <Plugin activePlugin={activePlugin} />
        </div>
        {/* Attributions should be a plugin */}
      </Modal>
    )}
  </>
);
