import { Point } from "./Point.js";

export class Charger {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pointArray = [];

    for (let i = 0; i < 5; i++) {
      this.pointArray.push(new Point(i, this.x + i * 35, this.y + 15, 3));
    }
  }

  draw(ctx, moveY, x, y) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, 140, 40);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "#39d665";
    ctx.beginPath();

    let prevX = this.pointArray[0].x;
    let prevY = this.pointArray[0].y;
    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.pointArray.length; i++) {
      const p = this.pointArray[i];

      if (i < this.pointArray.length - 1) {
        if (this.x < x && x < this.x + 140 && this.y < y && y < this.y + 40) {
          p.update((moveY *= 0.4));
        } else {
          p.update(0);
        }
      }

      const cx = (p.x + prevX) / 2;
      const cy = (p.y + prevY) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.pointArray[i].x;
      prevY = this.pointArray[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.x + 140, this.y + 40);
    ctx.lineTo(this.x, this.y + 40);

    ctx.fill();
    ctx.closePath();
  }
}
