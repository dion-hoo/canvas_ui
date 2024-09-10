import { easeOutBack } from "./easing.js";

export class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.fixedX = x;
    this.y = y;
    this.radius = radius;

    this.endX = this.fixedX + 400;

    this.startDelay = new Date().getTime() / 1000;
    this.startTime = null;
  }

  update() {
    const time = 0.9;
    const delay = 1;
    const delayTime = new Date().getTime() / 1000 - this.startDelay;

    if (delayTime > delay) {
      if (!this.startTime) {
        this.startTime = new Date().getTime() / 1000;
      }
      const endTime = new Date().getTime() / 1000 - this.startTime;

      if (endTime < time) {
        this.x =
          this.fixedX + (this.endX - this.fixedX) * easeOutBack(endTime / time);
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
