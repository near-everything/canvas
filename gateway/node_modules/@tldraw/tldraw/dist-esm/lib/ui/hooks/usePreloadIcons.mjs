import { useEffect, useState } from "react";
import { iconTypes } from "../icon-types.mjs";
import { useAssetUrls } from "./useAssetUrls.mjs";
function usePreloadIcons() {
  const [isLoaded, setIsLoaded] = useState(false);
  const assetUrls = useAssetUrls();
  useEffect(() => {
    let cancelled = false;
    async function loadImages() {
      await Promise.allSettled(
        iconTypes.map((icon) => {
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
export {
  usePreloadIcons
};
//# sourceMappingURL=usePreloadIcons.mjs.map
