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

const [isModalOpen, setModalOpen] = useState(false);
const [activePluginId, setActivePluginId] = useState(null);

const toggleModal = (pluginId) => {
  setModalOpen(!isModalOpen);
  setActivePluginId(pluginId);
};

const Button = styled.button`
  // this could take in theme
  padding: 10px 20px;
`;

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
  path,
  loadSnapshot,
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
  // {
  //   id: "grant.permissions",
  //   button: {
  //     icon: "bi bi-unlock",
  //     label: "grant permissions",
  //   },
  //   interface: {
  //     src: "everycanvas.near/widget/GrantPermissions",
  //     props: {
  //       path,
  //     },
  //     attribution: ["microchipgnu.near", "mob.near"], // this should come from widget metadata
  //     isVisible: context.accountId === creatorId,
  //   },
  // },
  {
    id: "embed",
    button: {
      icon: "bi bi-code",
      label: "embed",
    },
    interface: {
      src: "everycanvas.near/widget/Embed",
      props: {
        makeEmptyResponseShape: makeEmptyResponseShape,
        populateResponseShape: populateResponseShape,
        path: getSelectionAsText(),
        onSubmit: (path) => {
          console.log("submitted", path);
        }
      },
      attribution: ["efiz.near"], // this should come from widget metadata
      isVisible: context.accountId === creatorId,
    },
  },
  {
    id: "canvas.load",
    button: {
      icon: "bi bi-clock-history",
      label: "history",
    },
    interface: {
      src: "everycanvas.near/widget/hyperfile.load",
      props: {
        // Prop hydration (?)
        creatorId: creatorId, // requester?
        source: "tldraw", // hardcoded Props
        type: "canvas",
        filename: "main",
        path: path,
        loadSnapshot: loadSnapshot
      },
      attribution: ["bozon.near", "near", "james.near"], // this should come from widget metadata
      isVisible: context.accountId === creatorId,
    },
  },
  {
    id: "canvas.save",
    button: {
      icon: "bi bi-upload",
      label: "publish",
    },
    interface: {
      src: "everycanvas.near/widget/hyperfile.create",
      props: {
        // Prop hydration (?)
        creatorId: creatorId, // requester?
        source: "tldraw", // hardcoded Props
        type: "canvas",
        filename: "main",
        data: JSON.stringify(snapshot), // vs dynamic
        loadSnapshot: loadSnapshot
      },
      attribution: ["hack.near", "flowscience.near"], // this should come from widget metadata
      isVisible: context.accountId === creatorId,
    },
  },
  // {
  //   id: "canvas.request.merge",
  //   button: {
  //     icon: "bi bi-sign-merge-right",
  //     label: "request merge",
  //   },
  //   interface: {
  //     src: "james.near/widget/update",
  //     props: {},
  //     attribution: ["james.near"],
  //     isVisible: context.accountId !== creatorId,
  //   },
  // },
  // {
  //   id: "canvas.post",
  //   button: {
  //     icon: "bi bi-send",
  //     label: "post",
  //     // disabled: selectedShapes.length === 0,
  //   },
  //   interface: {
  //     src: "everycanvas.near/widget/canvas.post",
  //     props: {
  //       shapes: JSON.stringify(selectedShapes),
  //       item: {
  //         type: "social",
  //         path: path,
  //       },
  //     },
  //     attribution: ["efiz.near"],
  //     isVisible: context.accountId,
  //   },
  // },
];

const activePlugin = plugins.find((plugin) => plugin.id === activePluginId);

return (
  <>
    {plugins.map(
      (plugin) =>
        plugin.interface.isVisible && (
          <Button
            className="classic"
            onClick={() => toggleModal(plugin.id)}
            disabled={plugin.button.disabled}
          >
            <>
              <i className={plugin.button.icon} />
              {plugin.button.label}
            </>
          </Button>
        )
    )}
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
