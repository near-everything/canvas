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
var store_migrations_exports = {};
__export(store_migrations_exports, {
  storeMigrations: () => storeMigrations,
  storeVersions: () => Versions
});
module.exports = __toCommonJS(store_migrations_exports);
var import_store = require("@tldraw/store");
const Versions = {
  RemoveCodeAndIconShapeTypes: 1,
  AddInstancePresenceType: 2,
  RemoveTLUserAndPresenceAndAddPointer: 3,
  RemoveUserDocument: 4
};
const storeMigrations = (0, import_store.defineMigrations)({
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
//# sourceMappingURL=store-migrations.js.map
