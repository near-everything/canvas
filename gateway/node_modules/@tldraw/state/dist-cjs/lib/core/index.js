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
var core_exports = {};
__export(core_exports, {
  EMPTY_ARRAY: () => import_helpers.EMPTY_ARRAY,
  EffectScheduler: () => import_EffectScheduler.EffectScheduler,
  RESET_VALUE: () => import_types.RESET_VALUE,
  atom: () => import_Atom.atom,
  computed: () => import_Computed.computed,
  getComputedInstance: () => import_Computed.getComputedInstance,
  isAtom: () => import_Atom.isAtom,
  isSignal: () => import_isSignal.isSignal,
  isUninitialized: () => import_Computed.isUninitialized,
  react: () => import_EffectScheduler.react,
  reactor: () => import_EffectScheduler.reactor,
  transact: () => import_transactions.transact,
  transaction: () => import_transactions.transaction,
  unsafe__withoutCapture: () => import_capture.unsafe__withoutCapture,
  whyAmIRunning: () => import_capture.whyAmIRunning,
  withDiff: () => import_Computed.withDiff
});
module.exports = __toCommonJS(core_exports);
var import_Atom = require("./Atom");
var import_Computed = require("./Computed");
var import_EffectScheduler = require("./EffectScheduler");
var import_capture = require("./capture");
var import_helpers = require("./helpers");
var import_isSignal = require("./isSignal");
var import_transactions = require("./transactions");
var import_types = require("./types");
//# sourceMappingURL=index.js.map
