/**
 * Opens a modal
 * Takes in props.data
 *
 * Ability to view/edit incoming data
 *
 * Select a preset or create new
 * Shows the prompt (editable textarea)
 * Shows the modal (editable select)
 *
 * Press submit
 * Async request through near-openai
 * If error, show error here and response data
 * If success, show the response data
 * Click apply or abandon changes
 */

const [ask_ai, set_ask_ai] = useState(() =>
  console.log("method : 'ask_ai' not ready")
); 

if (ask_ai) {
  console.log("it's something...");
}
console.log("it's nothing.");
// ask_ai();

return (
  <div className="row">
    <div className="col">
      <button
        className="classic"
        onClick={() => {
          if (ask_ai) {
            console.log("it's something...");
            ask_ai();
          } else {
            console.log("it's nothing.");
          }
        }}
      >
        Ask AI
      </button>
    </div>
    <Widget
      src="everycanvas.near/widget/plugin.NearOpenAI.index"
      props={{
        methods: {
          ask_ai: (method_ask_ai) => {
            console.log("calling to set ask_ai to method_ask_ai");
            if (method_ask_ai) {
              console.log("calling ask_ai with something: ", typeof method_ask_ai);
              set_ask_ai( // this updates the parent state
                method_ask_ai ??
                  (() => console.log("method : 'ask_ai' not found"))
              );
            }
            console.log("calling ask_ai with nothing");
          },
        },
      }}
    />
  </div>
);
