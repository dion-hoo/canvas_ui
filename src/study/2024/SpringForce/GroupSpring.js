import { Point } from "./Point.js";
import { Spring } from "./Spring.js";

export class GroupSpring {
  constructor(x, y, length, K, restLength, hsl) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.K = K;
    this.restLength = restLength;
    this.points = [];
    this.srpings = [];
    this.gravity = {
      x: Math.random() * 2 - 1,
      y: 1.2,
    };

    this.hsl = hsl;

    for (let i = 0; i < length; i++) {
      const radius = 15;
      const y = this.y + i * this.restLength + radius;

      this.points.push(new Point(this.x, y, radius, this.hsl));

      this.points[0].islocked = true;

      if (i !== 0) {
        const p1 = this.points[i];
        const p2 = this.points[i - 1];

        this.srpings.push(new Spring(this.K, restLength, p1, p2, this.hsl));
      }

      this.hsl += 3;
    }
  }

  draw(ctx, mouse, hue) {
    for (let s of this.srpings) {
      s.update();
      s.draw(ctx);
    }

    for (let [index, p] of this.points.entries()) {
      if (index !== 0) {
        p.mouseUpdate(mouse);
        p.update(this.gravity);

        p.draw(ctx, hue);

        this.gravity.x *= 0.99;
      }
    }
  }
}
