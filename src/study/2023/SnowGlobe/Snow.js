import { Raycasting } from "./Raycasting.js";

export class Snow {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = this.radius / 2;
  }

  update(circle) {
    const point = {
      x: this.x,
      y: this.y,
      radius: this.radius,
    };

    const raycasting = new Raycasting(point, circle);

    const isInside = raycasting.update();

    if (isInside) {
      this.y += this.mass;
    } else {
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
