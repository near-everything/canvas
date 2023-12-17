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
var media_exports = {};
__export(media_exports, {
  MediaHelpers: () => MediaHelpers
});
module.exports = __toCommonJS(media_exports);
var import_file = require("./file");
var import_png = require("./png");
class MediaHelpers {
  /**
   * Get the size of a video from its source.
   *
   * @param src - The source of the video.
   * @public
   */
  static async getVideoSizeFromSrc(src) {
    return await new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.onloadeddata = () => resolve({ w: video.videoWidth, h: video.videoHeight });
      video.onerror = (e) => {
        console.error(e);
        reject(new Error("Could not get video size"));
      };
      video.crossOrigin = "anonymous";
      video.src = src;
    });
  }
  /**
   * Get the size of an image from its source.
   *
   * @param dataURL - The file as a string.
   * @public
   */
  static async getImageSizeFromSrc(dataURL) {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = async () => {
        try {
          const blob = await import_file.FileHelpers.base64ToFile(dataURL);
          const view = new DataView(blob);
          if (import_png.PngHelpers.isPng(view, 0)) {
            const physChunk = import_png.PngHelpers.findChunk(view, "pHYs");
            if (physChunk) {
              const physData = import_png.PngHelpers.parsePhys(view, physChunk.dataOffset);
              if (physData.unit === 0 && physData.ppux === physData.ppuy) {
                const pixelRatio = Math.round(physData.ppux / 2834.5);
                resolve({ w: img.width / pixelRatio, h: img.height / pixelRatio });
                return;
              }
            }
          }
          resolve({ w: img.width, h: img.height });
        } catch (err) {
          console.error(err);
          resolve({ w: img.width, h: img.height });
        }
      };
      img.onerror = (err) => {
        console.error(err);
        reject(new Error("Could not get image size"));
      };
      img.crossOrigin = "anonymous";
      img.src = dataURL;
    });
  }
}
//# sourceMappingURL=media.js.map
