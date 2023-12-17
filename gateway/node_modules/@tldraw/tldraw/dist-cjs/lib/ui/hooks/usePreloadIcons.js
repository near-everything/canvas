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
var usePreloadIcons_exports = {};
__export(usePreloadIcons_exports, {
  usePreloadIcons: () => usePreloadIcons
});
module.exports = __toCommonJS(usePreloadIcons_exports);
var import_react = require("react");
var import_icon_types = require("../icon-types");
var import_useAssetUrls = require("./useAssetUrls");
function usePreloadIcons() {
  const [isLoaded, setIsLoaded] = (0, import_react.useState)(false);
  const assetUrls = (0, import_useAssetUrls.useAssetUrls)();
  (0, import_react.useEffect)(() => {
    let cancelled = false;
    async function loadImages() {
      await Promise.allSettled(
        import_icon_types.iconTypes.map((icon) => {
          const image = new Image();
          image.src = assetUrls.icons[icon];
          return image.decode();
        })
      );
      if (cancelled)
        return;
      setIsLoaded(true);
    }
    loadImages();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, assetUrls]);
  return isLoaded;
}
//# sourceMappingURL=usePreloadIcons.js.map
