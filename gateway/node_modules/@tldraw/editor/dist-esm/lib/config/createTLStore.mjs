import { Store } from "@tldraw/store";
import {
  createTLSchema
} from "@tldraw/tlschema";
import { checkShapesAndAddCore } from "./defaultShapes.mjs";
function createTLStore({ initialData, defaultName = "", ...rest }) {
  const schema = "schema" in rest && rest.schema ? (
    // we have a schema
    (rest.schema)
  ) : (
    // we need a schema
    (createTLSchema({
      shapes: currentPageShapesToShapeMap(
        checkShapesAndAddCore("shapeUtils" in rest && rest.shapeUtils ? rest.shapeUtils : [])
      )
    }))
  );
  return new Store({
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
export {
  createTLStore
};
//# sourceMappingURL=createTLStore.mjs.map
