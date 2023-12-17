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
var object_exports = {};
__export(object_exports, {
  deepCopy: () => deepCopy,
  filterEntries: () => filterEntries,
  getOwnProperty: () => getOwnProperty,
  hasOwnProperty: () => hasOwnProperty,
  mapObjectMapValues: () => mapObjectMapValues,
  objectMapEntries: () => objectMapEntries,
  objectMapFromEntries: () => objectMapFromEntries,
  objectMapKeys: () => objectMapKeys,
  objectMapValues: () => objectMapValues
});
module.exports = __toCommonJS(object_exports);
function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function getOwnProperty(obj, key) {
  if (!hasOwnProperty(obj, key)) {
    return void 0;
  }
  return obj[key];
}
function deepCopy(obj) {
  if (!obj)
    return obj;
  if (Array.isArray(obj)) {
    const arr = [];
    const length = obj.length;
    for (let i = 0; i < length; i++)
      arr.push(deepCopy(obj[i]));
    return arr;
  } else if (typeof obj === "object") {
    const keys = Object.keys(obj);
    const length = keys.length;
    const newObject = {};
    for (let i = 0; i < length; i++) {
      const key = keys[i];
      newObject[key] = deepCopy(obj[key]);
    }
    return newObject;
  }
  return obj;
}
function objectMapKeys(object) {
  return Object.keys(object);
}
function objectMapValues(object) {
  return Object.values(object);
}
function objectMapEntries(object) {
  return Object.entries(object);
}
function objectMapFromEntries(entries) {
  return Object.fromEntries(entries);
}
function filterEntries(object, predicate) {
  const result = {};
  let didChange = false;
  for (const [key, value] of objectMapEntries(object)) {
    if (predicate(key, value)) {
      result[key] = value;
    } else {
      didChange = true;
    }
  }
  return didChange ? result : object;
}
function mapObjectMapValues(object, mapper) {
  const result = {};
  for (const [key, value] of objectMapEntries(object)) {
    const newValue = mapper(key, value);
    result[key] = newValue;
  }
  return result;
}
//# sourceMappingURL=object.js.map
