import { createRecordType, defineMigrations } from "@tldraw/store";
import { T } from "@tldraw/validate";
import { idValidator } from "../misc/id-validator.mjs";
const cameraValidator = T.model(
  "camera",
  T.object({
    typeName: T.literal("camera"),
    id: idValidator("camera"),
    x: T.number,
    y: T.number,
    z: T.number,
    meta: T.jsonValue
  })
);
const cameraVersions = {
  AddMeta: 1
};
const cameraMigrations = defineMigrations({
  currentVersion: cameraVersions.AddMeta,
  migrators: {
    [cameraVersions.AddMeta]: {
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
const CameraRecordType = createRecordType("camera", {
  validator: cameraValidator,
  migrations: cameraMigrations,
  scope: "session"
}).withDefaultProperties(
  () => ({
    x: 0,
    y: 0,
    z: 1,
    meta: {}
  })
);
export {
  CameraRecordType,
  cameraMigrations,
  cameraValidator,
  cameraVersions
};
//# sourceMappingURL=TLCamera.mjs.map
