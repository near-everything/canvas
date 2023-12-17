import { jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
const AssetUrlsContext = createContext(null);
function AssetUrlsProvider({
  assetUrls,
  children
}) {
  return /* @__PURE__ */ jsx(AssetUrlsContext.Provider, { value: assetUrls, children });
}
function useAssetUrls() {
  const assetUrls = useContext(AssetUrlsContext);
  if (!assetUrls) {
    throw new Error("useAssetUrls must be used within an AssetUrlsProvider");
  }
  return assetUrls;
}
export {
  AssetUrlsProvider,
  useAssetUrls
};
//# sourceMappingURL=useAssetUrls.mjs.map
