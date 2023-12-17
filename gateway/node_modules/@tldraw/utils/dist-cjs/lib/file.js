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
var file_exports = {};
__export(file_exports, {
  FileHelpers: () => FileHelpers
});
module.exports = __toCommonJS(file_exports);
class FileHelpers {
  /**
   * @param dataURL - The file as a string.
   * @internal
   *
   * from https://stackoverflow.com/a/53817185
   */
  static async base64ToFile(dataURL) {
    return fetch(dataURL).then(function(result) {
      return result.arrayBuffer();
    });
  }
  /**
   * Convert a file to base64.
   *
   * @example
   *
   * ```ts
   * const A = fileToBase64('./test.png')
   * ```
   *
   * @param value - The file as a blob.
   * @public
   */
  static async fileToBase64(file) {
    return await new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.onabort = (error) => reject(error);
      }
    });
  }
}
//# sourceMappingURL=file.js.map
