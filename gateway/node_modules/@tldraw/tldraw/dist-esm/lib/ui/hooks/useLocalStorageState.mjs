import React from "react";
function useLocalStorageState(key, defaultValue) {
  const [state, setState] = React.useState(defaultValue);
  React.useLayoutEffect(() => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        setState(JSON.parse(value));
      } catch (e) {
        console.error(`Could not restore value ${key} from local storage.`);
      }
    }
  }, [key]);
  const updateValue = React.useCallback(
    (setter) => {
      setState((s) => {
        const value = typeof setter === "function" ? setter(s) : setter;
        localStorage.setItem(key, JSON.stringify(value));
        return value;
      });
    },
    [key]
  );
  return [state, updateValue];
}
export {
  useLocalStorageState
};
//# sourceMappingURL=useLocalStorageState.mjs.map
