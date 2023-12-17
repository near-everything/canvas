import { T } from "@tldraw/validate";
const TL_HANDLE_TYPES = /* @__PURE__ */ new Set(["vertex", "virtual", "create"]);
const handleValidator = T.object({
  id: T.string,
  type: T.setEnum(TL_HANDLE_TYPES),
  canBind: T.boolean.optional(),
  canSnap: T.boolean.optional(),
  index: T.string,
  x: T.number,
  y: T.number
});
export {
  TL_HANDLE_TYPES,
  handleValidator
};
//# sourceMappingURL=TLHandle.mjs.map
