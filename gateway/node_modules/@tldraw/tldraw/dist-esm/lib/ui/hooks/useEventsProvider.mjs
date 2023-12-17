import { jsx } from "react/jsx-runtime";
import * as React from "react";
const defaultEventHandler = () => void 0;
const EventsContext = React.createContext({});
function UiEventsProvider({ onEvent, children }) {
  return /* @__PURE__ */ jsx(EventsContext.Provider, { value: onEvent ?? defaultEventHandler, children });
}
function useUiEvents() {
  const eventHandler = React.useContext(EventsContext);
  return eventHandler ?? defaultEventHandler;
}
export {
  EventsContext,
  UiEventsProvider,
  useUiEvents
};
//# sourceMappingURL=useEventsProvider.mjs.map
