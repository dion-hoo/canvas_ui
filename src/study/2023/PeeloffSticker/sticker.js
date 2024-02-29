import { util } from "./Util.js";

export class Sticker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 400;
    this.height = 200;
    this.util = util;

    this.point = [
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y },
      { x: this.x + this.width, y: this.y + this.height },
      {
        x: this.x,
        y: this.y + this.height,
      },
      { x: this.x, y: this.y },
    ];
  }

  getPoint(i, moveX, moveY) {
    const p1 = this.point[i];
    const p2 = this.point[i + 1];

    const { x, y, isOverX, isOverY } = this.util.projection(
      p1.x,
      p1.y,
      p2.x,
      p2.y,
      moveX,
      moveY
    );

    return { x: x, y: y, cx: x, cy: y };
  }

  update(ctx, moveX, moveY) {
    if (moveX <= this.x + this.width && moveY >= this.y) {
      const p1 = this.getPoint(0, moveX, moveY);
      const p2 = this.getPoint(1, moveX, moveY);

      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 5, 0, Math.PI * 2);
      ctx.arc(p2.x, p2.y, 5, 0, Math.PI * 2);

      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.arc(p1.cx, p2.cy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p1.cx, p2.cy);
      ctx.fill();
      ctx.closePath();
    }
  }

  draw(ctx) {
    ctx.strokeStyle = "#000";

    ctx.beginPath();
    ctx.moveTo(this.point[0].x, this.point[0]);
    for (let i = 0; i < this.point.length; i++) {
      const p = this.point[i];

      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.closePath();
  }
}
