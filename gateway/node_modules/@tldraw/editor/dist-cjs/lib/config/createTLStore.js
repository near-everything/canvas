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
var createTLStore_exports = {};
__export(createTLStore_exports, {
  createTLStore: () => createTLStore
});
module.exports = __toCommonJS(createTLStore_exports);
var import_store = require("@tldraw/store");
var import_tlschema = require("@tldraw/tlschema");
var import_defaultShapes = require("./defaultShapes");
function createTLStore({ initialData, defaultName = "", ...rest }) {
  const schema = "schema" in rest && rest.schema ? (
    // we have a schema
    rest.schema
  ) : (
    // we need a schema
    (0, import_tlschema.createTLSchema)({
      shapes: currentPageShapesToShapeMap(
        (0, import_defaultShapes.checkShapesAndAddCore)("shapeUtils" in rest && rest.shapeUtils ? rest.shapeUtils : [])
      )
    })
  );
  return new import_store.Store({
    schema,
    initialData,
    props: {
      defaultName
    }
  });
}
function currentPageShapesToShapeMap(shapeUtils) {
  return Object.fromEntries(
    shapeUtils.map((s) => [
      s.type,
      {
        props: s.props,
        migrations: s.migrations
      }
    ])
  );
}
//# sourceMappingURL=createTLStore.js.map
