import { useEffect, useMemo, useState } from "react";
var PreloadStatus = /* @__PURE__ */ ((PreloadStatus2) => {
  PreloadStatus2[PreloadStatus2["SUCCESS"] = 0] = "SUCCESS";
  PreloadStatus2[PreloadStatus2["FAILED"] = 1] = "FAILED";
  PreloadStatus2[PreloadStatus2["WAITING"] = 2] = "WAITING";
  return PreloadStatus2;
})(PreloadStatus || {});
const usePreloadFont = (id, font) => {
  const [state, setState] = useState(2 /* WAITING */);
  useEffect(() => {
    const {
      url,
      style = "normal",
      weight = "500",
      display,
      featureSettings,
      stretch,
      unicodeRange,
      variant
    } = font;
    let cancelled = false;
    setState(2 /* WAITING */);
    const descriptors = {
      style,
      weight,
      display,
      featureSettings,
      stretch,
      unicodeRange,
      variant
    };
    const fontInstance = new FontFace(id, `url(${url})`, descriptors);
    fontInstance.load().then(() => {
      if (cancelled)
        return;
      document.fonts.add(fontInstance);
      setState(0 /* SUCCESS */);
    }).catch((err) => {
      if (cancelled)
        return;
      console.error(err);
      setState(1 /* FAILED */);
    });
    fontInstance.$$_url = url;
    fontInstance.$$_fontface = `
@font-face {
	font-family: ${fontInstance.family};
	font-stretch: ${fontInstance.stretch};
	font-weight: ${fontInstance.weight};
	font-style: ${fontInstance.style};
	src: url("${url}") format("woff2")
}`;
    return () => {
      document.fonts.delete(fontInstance);
      cancelled = true;
    };
  }, [id, font]);
  return state;
};
function getTypefaces(assetUrls) {
  return {
    draw: { url: assetUrls.fonts.draw },
    serif: { url: assetUrls.fonts.serif },
    sansSerif: { url: assetUrls.fonts.sansSerif },
    monospace: { url: assetUrls.fonts.monospace }
  };
}
function usePreloadAssets(assetUrls) {
  const typefaces = useMemo(() => getTypefaces(assetUrls), [assetUrls]);
  const results = [
    usePreloadFont("tldraw_draw", typefaces.draw),
    usePreloadFont("tldraw_serif", typefaces.serif),
    usePreloadFont("tldraw_sans", typefaces.sansSerif),
    usePreloadFont("tldraw_mono", typefaces.monospace)
  ];
  return {
    // If any of the results have errored, then preloading has failed
    error: results.some((result) => result === 1 /* FAILED */),
    // If any of the results are waiting, then we're not done yet
    done: !results.some((result) => result === 2 /* WAITING */)
  };
}
export {
  usePreloadAssets
};
//# sourceMappingURL=usePreloadAssets.mjs.map
