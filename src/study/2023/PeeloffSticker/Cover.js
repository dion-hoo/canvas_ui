import { RayCasting } from "./RayCasting.js";

export class Cover {
  constructor(point) {
    this.point = point;
  }

  draw(ctx) {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);

    ctx.moveTo(this.point[0].x, this.point[0].y);
    for (let i = 1; i < this.point.length; i++) {
      const p = this.point[i];

      ctx.lineTo(p.x, p.y);
    }

    ctx.stroke();
    ctx.closePath();
  }
}
