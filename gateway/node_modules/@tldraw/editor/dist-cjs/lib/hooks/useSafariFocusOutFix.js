"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useSafariFocusOutFix_exports = {};
__export(useSafariFocusOutFix_exports, {
  useSafariFocusOutFix: () => useSafariFocusOutFix
});
module.exports = __toCommonJS(useSafariFocusOutFix_exports);
var React = __toESM(require("react"));
var import_useEditor = require("./useEditor");
let isMobileSafari = false;
if (typeof window !== "undefined") {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  isMobileSafari = iOS && webkit && !ua.match(/CriOS/i);
}
function useSafariFocusOutFix() {
  const editor = (0, import_useEditor.useEditor)();
  React.useEffect(() => {
    if (!isMobileSafari)
      return;
    function handleFocusOut(e) {
      if (e.target instanceof HTMLInputElement && e.target.type === "text" || e.target instanceof HTMLTextAreaElement) {
        editor.complete();
      }
    }
    document.addEventListener("focusout", handleFocusOut);
    return () => document.removeEventListener("focusout", handleFocusOut);
  }, [editor]);
}
//# sourceMappingURL=useSafariFocusOutFix.js.map
