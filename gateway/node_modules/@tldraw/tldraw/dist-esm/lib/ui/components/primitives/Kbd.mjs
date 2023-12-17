import { jsx } from "react/jsx-runtime";
import { kbd } from "./shared.mjs";
function Kbd({ children }) {
  return /* @__PURE__ */ jsx("kbd", { className: "tlui-kbd", children: kbd(children).map((k, i) => /* @__PURE__ */ jsx("span", { children: k }, i)) });
}
export {
  Kbd
};
//# sourceMappingURL=Kbd.mjs.map
