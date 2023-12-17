import { deleteDB } from "idb";
import { getAllIndexDbNames } from "./indexedDb.mjs";
async function hardReset({ shouldReload = true } = {}) {
  sessionStorage.clear();
  await Promise.all(getAllIndexDbNames().map((db) => deleteDB(db)));
  localStorage.clear();
  if (shouldReload) {
    window.location.reload();
  }
}
if (typeof window !== "undefined") {
  if (process.env.NODE_ENV === "development") {
    ;
    window.hardReset = hardReset;
  }
  ;
  window.__tldraw__hardReset = hardReset;
}
export {
  hardReset
};
//# sourceMappingURL=hardReset.mjs.map
