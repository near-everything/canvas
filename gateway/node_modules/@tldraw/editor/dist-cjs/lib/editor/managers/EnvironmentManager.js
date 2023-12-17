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
var EnvironmentManager_exports = {};
__export(EnvironmentManager_exports, {
  EnvironmentManager: () => EnvironmentManager
});
module.exports = __toCommonJS(EnvironmentManager_exports);
class EnvironmentManager {
  constructor(editor) {
    this.editor = editor;
    if (typeof window !== "undefined" && "navigator" in window) {
      this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      this.isIos = !!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i);
      this.isChromeForIos = /crios.*safari/i.test(navigator.userAgent);
      this.isFirefox = /firefox/i.test(navigator.userAgent);
      this.isAndroid = /android/i.test(navigator.userAgent);
    } else {
      this.isSafari = false;
      this.isIos = false;
      this.isChromeForIos = false;
      this.isFirefox = false;
      this.isAndroid = false;
    }
  }
  /**
   * Whether the editor is running in Safari.
   *
   * @public
   */
  isSafari;
  /**
   * Whether the editor is running on iOS.
   *
   * @public
   */
  isIos;
  /**
   * Whether the editor is running on iOS.
   *
   * @public
   */
  isChromeForIos;
  /**
   * Whether the editor is running on Firefox.
   *
   * @public
   */
  isFirefox;
  /**
   * Whether the editor is running on Android.
   *
   * @public
   */
  isAndroid;
}
//# sourceMappingURL=EnvironmentManager.js.map
