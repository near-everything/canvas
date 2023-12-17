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
var createTLUser_exports = {};
__export(createTLUser_exports, {
  createTLUser: () => createTLUser
});
module.exports = __toCommonJS(createTLUser_exports);
var import_state = require("@tldraw/state");
var import_TLUserPreferences = require("./TLUserPreferences");
function createTLUser(opts = {}) {
  return {
    derivePresenceState: opts.derivePresenceState ?? (() => (0, import_state.computed)("presence", () => null)),
    userPreferences: opts.userPreferences ?? (0, import_state.computed)("userPreferences", () => (0, import_TLUserPreferences.getUserPreferences)()),
    setUserPreferences: opts.setUserPreferences ?? import_TLUserPreferences.setUserPreferences
  };
}
//# sourceMappingURL=createTLUser.js.map
