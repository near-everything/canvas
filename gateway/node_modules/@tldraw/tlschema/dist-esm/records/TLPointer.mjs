import { createRecordType, defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { idValidator } from "../misc/id-validator.mjs";
const pointerValidator = T.model(
  "pointer",
  T.object({
    typeName: T.literal("pointer"),
    id: idValidator("pointer"),
    x: T.number,
    y: T.number,
    lastActivityTimestamp: T.number,
    meta: T.jsonValue
  })
);
const pointerVersions = {
  AddMeta: 1
};
const pointerMigrations = defineMigrations({
  currentVersion: pointerVersions.AddMeta,
  migrators: {
    [pointerVersions.AddMeta]: {
      up: (record) => {
        return {
          ...record,
          meta: {}
        };
      },
      down: ({ meta: _, ...record }) => {
        return {
          ...record
        };
      }
    }
  }
});
const PointerRecordType = createRecordType("pointer", {
  validator: pointerValidator,
  migrations: pointerMigrations,
  scope: "session"
}).withDefaultProperties(
  () => ({
    x: 0,
    y: 0,
    lastActivityTimestamp: 0,
    meta: {}
  })
);
const TLPOINTER_ID = PointerRecordType.createId("pointer");
export {
  PointerRecordType,
  TLPOINTER_ID,
  pointerMigrations,
  pointerValidator,
  pointerVersions
};
//# sourceMappingURL=TLPointer.mjs.map
