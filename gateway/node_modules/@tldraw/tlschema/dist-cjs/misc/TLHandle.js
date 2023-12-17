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
var TLHandle_exports = {};
__export(TLHandle_exports, {
  TL_HANDLE_TYPES: () => TL_HANDLE_TYPES,
  handleValidator: () => handleValidator
});
module.exports = __toCommonJS(TLHandle_exports);
var import_validate = require("@tldraw/validate");
const TL_HANDLE_TYPES = /* @__PURE__ */ new Set(["vertex", "virtual", "create"]);
const handleValidator = import_validate.T.object({
  id: import_validate.T.string,
  type: import_validate.T.setEnum(TL_HANDLE_TYPES),
  canBind: import_validate.T.boolean.optional(),
  canSnap: import_validate.T.boolean.optional(),
  index: import_validate.T.string,
  x: import_validate.T.number,
  y: import_validate.T.number
});
//# sourceMappingURL=TLHandle.js.map
