import { createRecordType, defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
const documentValidator = T.model(
  "document",
  T.object({
    typeName: T.literal("document"),
    id: T.literal("document:document"),
    gridSize: T.number,
    name: T.string,
    meta: T.jsonValue
  })
);
const documentVersions = {
  AddName: 1,
  AddMeta: 2
};
const documentMigrations = defineMigrations({
  currentVersion: documentVersions.AddMeta,
  migrators: {
    [documentVersions.AddName]: {
      up: (document) => {
        return { ...document, name: "" };
      },
      down: ({ name: _, ...document }) => {
        return document;
      }
    },
    [documentVersions.AddMeta]: {
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
const DocumentRecordType = createRecordType("document", {
  migrations: documentMigrations,
  validator: documentValidator,
  scope: "document"
}).withDefaultProperties(
  () => ({
    gridSize: 10,
    name: "",
    meta: {}
  })
);
const TLDOCUMENT_ID = DocumentRecordType.createId("document");
export {
  DocumentRecordType,
  TLDOCUMENT_ID,
  documentMigrations,
  documentValidator,
  documentVersions
};
//# sourceMappingURL=TLDocument.mjs.map
