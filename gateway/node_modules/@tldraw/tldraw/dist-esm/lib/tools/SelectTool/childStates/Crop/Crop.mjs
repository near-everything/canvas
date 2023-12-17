import { StateNode } from "@tldraw/editor";
import { Idle } from "./children/Idle.mjs";
import { PointingCrop } from "./children/PointingCrop.mjs";
import { TranslatingCrop } from "./children/TranslatingCrop.mjs";
class Crop extends StateNode {
  static id = "crop";
  static initial = "idle";
  static children = () => [Idle, TranslatingCrop, PointingCrop];
}
export {
  Crop
};
//# sourceMappingURL=Crop.mjs.map
