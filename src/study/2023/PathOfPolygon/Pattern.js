import { Util } from "./Util.js";

export class Pattern {
  constructor(index, points) {
    this.index = index;
    this.points = points;
    this.util = new Util();
  }

  draw(t) {
    let time = (t %= 1);
    let index = this.index;

    const p0 = this.points[index];
    const p1 = this.points[index + 1];

    const c1x = this.util.lerp(p0.x, p1.x, time);
    const c1y = this.util.lerp(p0.y, p1.y, time);

    if (this.points[index].type === "curve") {
      const p2 = this.points[index + 2];

      const c2x = this.util.lerp(p1.x, p2.x, time);
      const c2y = this.util.lerp(p1.y, p2.y, time);

      const bx = this.util.lerp(c1x, c2x, time);
      const by = this.util.lerp(c1y, c2y, time);

      return { x: bx, y: by };
    }

    return { x: c1x, y: c1y };
  }
}
