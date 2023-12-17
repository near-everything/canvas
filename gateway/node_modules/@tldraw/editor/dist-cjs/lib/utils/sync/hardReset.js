"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var hardReset_exports = {};
__export(hardReset_exports, {
  hardReset: () => hardReset
});
module.exports = __toCommonJS(hardReset_exports);
var import_idb = require("idb");
var import_indexedDb = require("./indexedDb");
async function hardReset({ shouldReload = true } = {}) {
  sessionStorage.clear();
  await Promise.all((0, import_indexedDb.getAllIndexDbNames)().map((db) => (0, import_idb.deleteDB)(db)));
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
//# sourceMappingURL=hardReset.js.map
