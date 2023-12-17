import { Box2d } from "../Box2d.mjs";
import { Vec2d } from "../Vec2d.mjs";
import { Polygon2d } from "./Polygon2d.mjs";
class Rectangle2d extends Polygon2d {
  x;
  y;
  w;
  h;
  constructor(config) {
    const { x = 0, y = 0, width, height } = config;
    super({
      ...config,
      points: [
        new Vec2d(x, y),
        new Vec2d(x + width, y),
        new Vec2d(x + width, y + height),
        new Vec2d(x, y + height)
      ]
    });
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
  }
  getBounds() {
    return new Box2d(this.x, this.y, this.w, this.h);
  }
}
export {
  Rectangle2d
};
//# sourceMappingURL=Rectangle2d.mjs.map
