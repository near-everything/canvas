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
var shared_exports = {};
__export(shared_exports, {
  kbd: () => kbd,
  kbdStr: () => kbdStr,
  toStartCase: () => toStartCase
});
module.exports = __toCommonJS(shared_exports);
function toStartCase(str) {
  return str.split(" ").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}
const isDarwin = typeof window === "undefined" ? false : window.navigator.userAgent.toLowerCase().indexOf("mac") > -1;
const cmdKey = isDarwin ? "\u2318" : "Ctrl";
const altKey = isDarwin ? "\u2325" : "Alt";
function kbd(str) {
  return str.split(",")[0].split("").map((sub) => {
    const subStr = sub.replace(/\$/g, cmdKey).replace(/\?/g, altKey).replace(/!/g, "\u21E7");
    return subStr[0].toUpperCase() + subStr.slice(1);
  });
}
function kbdStr(str) {
  return "\u2014 " + str.split(",")[0].split("").map((sub) => {
    const subStr = sub.replace(/\$/g, cmdKey).replace(/\?/g, altKey).replace(/!/g, "\u21E7");
    return subStr[0].toUpperCase() + subStr.slice(1);
  }).join("\u2009");
}
//# sourceMappingURL=shared.js.map
