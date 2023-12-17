import { createRecordType, defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { idValidator } from "../misc/id-validator.mjs";
const pageIdValidator = idValidator("page");
const pageValidator = T.model(
  "page",
  T.object({
    typeName: T.literal("page"),
    id: pageIdValidator,
    name: T.string,
    index: T.string,
    meta: T.jsonValue
  })
);
const pageVersions = {
  AddMeta: 1
};
const pageMigrations = defineMigrations({
  currentVersion: pageVersions.AddMeta,
  migrators: {
    [pageVersions.AddMeta]: {
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
const PageRecordType = createRecordType("page", {
  validator: pageValidator,
  migrations: pageMigrations,
  scope: "document"
}).withDefaultProperties(() => ({
  meta: {}
}));
function isPageId(id) {
  return PageRecordType.isId(id);
}
export {
  PageRecordType,
  isPageId,
  pageIdValidator,
  pageMigrations,
  pageValidator,
  pageVersions
};
//# sourceMappingURL=TLPage.mjs.map
