import { defineMigrations } from "@tldraw/store";
const Versions = {
  RemoveCodeAndIconShapeTypes: 1,
  AddInstancePresenceType: 2,
  RemoveTLUserAndPresenceAndAddPointer: 3,
  RemoveUserDocument: 4
};
const storeMigrations = defineMigrations({
  currentVersion: Versions.RemoveUserDocument,
  migrators: {
    [Versions.RemoveCodeAndIconShapeTypes]: {
      up: (store) => {
        return Object.fromEntries(
          Object.entries(store).filter(
            ([_, v]) => v.typeName !== "shape" || v.type !== "icon" && v.type !== "code"
          )
        );
      },
      down: (store) => {
        return store;
      }
    },
    [Versions.AddInstancePresenceType]: {
      up: (store) => {
        return store;
      },
      down: (store) => {
        return Object.fromEntries(
          Object.entries(store).filter(([_, v]) => v.typeName !== "instance_presence")
        );
      }
    },
    [Versions.RemoveTLUserAndPresenceAndAddPointer]: {
      up: (store) => {
        return Object.fromEntries(
          Object.entries(store).filter(([_, v]) => !v.typeName.match(/^(user|user_presence)$/))
        );
      },
      down: (store) => {
        return Object.fromEntries(
          Object.entries(store).filter(([_, v]) => v.typeName !== "pointer")
        );
      }
    },
    [Versions.RemoveUserDocument]: {
      up: (store) => {
        return Object.fromEntries(
          Object.entries(store).filter(([_, v]) => !v.typeName.match("user_document"))
        );
      },
      down: (store) => {
        return store;
      }
    }
  }
});
export {
  storeMigrations,
  Versions as storeVersions
};
//# sourceMappingURL=store-migrations.mjs.map
