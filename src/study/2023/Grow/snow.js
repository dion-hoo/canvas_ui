import { Raycasting } from "./raycasting.js";

export class Snow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0.4;

    this.raycasting = new Raycasting();
  }

  update(point) {
    const target = {
      x: this.x,
      y: this.y,
    };

    const intersection = this.raycasting.draw(target, point);

    if (!intersection) {
      this.vy += 0.1;
      this.y += this.vy;
    }

    if (this.y > innerHeight - 10) {
      this.vy *= -0.5;
      this.y = innerHeight - 10;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
