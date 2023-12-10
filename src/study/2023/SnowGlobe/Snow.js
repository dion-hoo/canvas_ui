import { Raycasting } from "./Raycasting.js";

export class Snow {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = (Math.random() * this.radius) / 2 + 3;
    this.isInside = false;
    this.isEnd = false;
  }

  update(isClick) {
    const point = {
      x: this.x,
      y: this.y,
      radius: this.radius,
    };

    // const raycasting = new Raycasting(point, circle);

    // const isInside = raycasting.update();

    if (true) {
      this.y += this.mass;
      // this.isInside = isInside;
    } else {
      if (this.isInside) {
        this.radius -= 0.01;
        if (this.radius < 0.1) {
          this.isEnd = true;
        }
      }
    }
  }

  draw(ctx) {
    if (this.isInside) {
      ctx.save();
      ctx.shadowColor = "#fff";
      ctx.shadowBlur = 10;

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      ctx.restore();
    }
  }
}
