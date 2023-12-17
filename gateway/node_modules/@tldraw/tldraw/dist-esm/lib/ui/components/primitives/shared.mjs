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
export {
  kbd,
  kbdStr,
  toStartCase
};
//# sourceMappingURL=shared.mjs.map
