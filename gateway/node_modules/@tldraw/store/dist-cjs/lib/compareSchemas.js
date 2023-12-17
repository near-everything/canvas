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
var compareSchemas_exports = {};
__export(compareSchemas_exports, {
  compareSchemas: () => compareSchemas
});
module.exports = __toCommonJS(compareSchemas_exports);
const compareSchemas = (a, b) => {
  if (a.schemaVersion > b.schemaVersion) {
    return 1;
  }
  if (a.schemaVersion < b.schemaVersion) {
    return -1;
  }
  if (a.storeVersion > b.storeVersion) {
    return 1;
  }
  if (a.storeVersion < b.storeVersion) {
    return -1;
  }
  for (const key of Object.keys(a.recordVersions)) {
    const aRecordVersion = a.recordVersions[key];
    const bRecordVersion = b.recordVersions[key];
    if (aRecordVersion.version > bRecordVersion.version) {
      return 1;
    }
    if (aRecordVersion.version < bRecordVersion.version) {
      return -1;
    }
    if ("subTypeVersions" in aRecordVersion && !("subTypeVersions" in bRecordVersion)) {
      return 1;
    }
    if (!("subTypeVersions" in aRecordVersion) && "subTypeVersions" in bRecordVersion) {
      return -1;
    }
    if (!("subTypeVersions" in aRecordVersion) || !("subTypeVersions" in bRecordVersion)) {
      continue;
    }
    for (const subType of Object.keys(aRecordVersion.subTypeVersions)) {
      const aSubTypeVersion = aRecordVersion.subTypeVersions[subType];
      const bSubTypeVersion = bRecordVersion.subTypeVersions[subType];
      if (aSubTypeVersion > bSubTypeVersion) {
        return 1;
      }
      if (aSubTypeVersion < bSubTypeVersion) {
        return -1;
      }
    }
  }
  return 0;
};
//# sourceMappingURL=compareSchemas.js.map
