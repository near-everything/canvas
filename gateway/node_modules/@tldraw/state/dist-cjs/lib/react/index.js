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
var react_exports = {};
__export(react_exports, {
  track: () => import_track.track,
  useAtom: () => import_useAtom.useAtom,
  useComputed: () => import_useComputed.useComputed,
  useQuickReactor: () => import_useQuickReactor.useQuickReactor,
  useReactor: () => import_useReactor.useReactor,
  useStateTracking: () => import_useStateTracking.useStateTracking,
  useValue: () => import_useValue.useValue
});
module.exports = __toCommonJS(react_exports);
var import_track = require("./track");
var import_useAtom = require("./useAtom");
var import_useComputed = require("./useComputed");
var import_useQuickReactor = require("./useQuickReactor");
var import_useReactor = require("./useReactor");
var import_useStateTracking = require("./useStateTracking");
var import_useValue = require("./useValue");
//# sourceMappingURL=index.js.map
