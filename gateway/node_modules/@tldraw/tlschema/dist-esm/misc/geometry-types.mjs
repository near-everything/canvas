import { T } from "@tldraw/validate";
const vec2dModelValidator = T.object({
  x: T.number,
  y: T.number,
  z: T.number.optional()
});
const box2dModelValidator = T.object({
  x: T.number,
  y: T.number,
  w: T.number,
  h: T.number
});
export {
  box2dModelValidator,
  vec2dModelValidator
};
//# sourceMappingURL=geometry-types.mjs.map
