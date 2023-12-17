import { EMBED_DEFINITIONS } from "@tldraw/editor";
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function matchEmbedUrl(url) {
  const host = new URL(url).host.replace("www.", "");
  for (const localEmbedDef of EMBED_DEFINITIONS) {
    if (checkHostnames(localEmbedDef.hostnames, host)) {
      const originalUrl = localEmbedDef.fromEmbedUrl(url);
      if (originalUrl) {
        return {
          definition: localEmbedDef,
          url: originalUrl,
          embedUrl: url
        };
      }
    }
  }
}
const globlikeRegExp = (input) => {
  return input.split("*").map((str) => escapeStringRegexp(str)).join(".+");
};
const checkHostnames = (hostnames, targetHostname) => {
  return !!hostnames.find((hostname) => {
    const re = new RegExp(globlikeRegExp(hostname));
    return targetHostname.match(re);
  });
};
function matchUrl(url) {
  const host = new URL(url).host.replace("www.", "");
  for (const localEmbedDef of EMBED_DEFINITIONS) {
    if (checkHostnames(localEmbedDef.hostnames, host)) {
      const embedUrl = localEmbedDef.toEmbedUrl(url);
      if (embedUrl) {
        return {
          definition: localEmbedDef,
          embedUrl,
          url
        };
      }
    }
  }
}
function getEmbedInfoUnsafely(inputUrl) {
  const result = matchUrl(inputUrl) ?? matchEmbedUrl(inputUrl);
  return result;
}
function getEmbedInfo(inputUrl) {
  try {
    return getEmbedInfoUnsafely(inputUrl);
  } catch (e) {
    console.error(e);
  }
  return void 0;
}
export {
  getEmbedInfo,
  getEmbedInfoUnsafely,
  matchEmbedUrl,
  matchUrl
};
//# sourceMappingURL=embeds.mjs.map
