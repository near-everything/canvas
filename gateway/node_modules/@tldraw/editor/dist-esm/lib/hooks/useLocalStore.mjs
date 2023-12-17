import { useEffect, useState } from "react";
import { TLLocalSyncClient } from "../utils/sync/TLLocalSyncClient.mjs";
import { uniqueId } from "../utils/uniqueId.mjs";
import { useTLStore } from "./useTLStore.mjs";
function useLocalStore({
  persistenceKey,
  sessionId,
  ...rest
}) {
  const [state, setState] = useState(
    null
  );
  const store = useTLStore(rest);
  useEffect(() => {
    const id = uniqueId();
    if (!persistenceKey) {
      setState({
        id,
        storeWithStatus: { status: "not-synced", store }
      });
      return;
    }
    setState({
      id,
      storeWithStatus: { status: "loading" }
    });
    const setStoreWithStatus = (storeWithStatus) => {
      setState((prev) => {
        if (prev?.id === id) {
          return { id, storeWithStatus };
        }
        return prev;
      });
    };
    const client = new TLLocalSyncClient(store, {
      sessionId,
      persistenceKey,
      onLoad() {
        setStoreWithStatus({ store, status: "synced-local" });
      },
      onLoadError(err) {
        setStoreWithStatus({ status: "error", error: err });
      }
    });
    return () => {
      setState((prevState) => prevState?.id === id ? null : prevState);
      client.close();
    };
  }, [persistenceKey, store, sessionId]);
  return state?.storeWithStatus ?? { status: "loading" };
}
export {
  useLocalStore
};
//# sourceMappingURL=useLocalStore.mjs.map
