import { Lerp } from "./lerp.js";

export class Line {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.point = [
      { x: x, y: y },
      { x: this.x + 200, y: this.y + 300 },
      { x: this.x + 400, y: this.y + 500 },
      { x: this.x + 600, y: this.y + 400 },
      { x: this.x + 800, y: this.y + 100 },
    ];

    this.lerp = new Lerp();

    this.newPoint = [];
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "yellow";

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.point[0].x, this.point[0].y);
    ctx.lineTo(this.point[1].x, this.point[1].y);
    ctx.quadraticCurveTo(
      this.point[2].x,
      this.point[2].y,
      this.point[3].x,
      this.point[3].y
    );
    ctx.lineTo(this.point[4].x, this.point[4].y);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // ctx.fillStyle = "red";

    // for (
    //   let i = 1, j = this.point.length - 2;
    //   i < this.point.length - 1;
    //   j = i++
    // ) {
    //   const p1 = this.point[i];
    //   const p2 = this.point[j];

    //   const x = this.lerp.get(p2.x, p1.x, 0.1);
    //   const y = this.lerp.get(p2.y, p1.y, 0.1);

    //   ctx.beginPath();
    //   ctx.arc(x, y, 8, 0, Math.PI * 2);
    //   ctx.fill();
    //   ctx.restore();
    // }

    this.newPoint = [
      this.getPoint(ctx, 0.1),
      this.getPoint(ctx, 0.15),
      this.getPoint(ctx, 0.2),
      this.getPoint(ctx, 0.25),
      this.getPoint(ctx, 0.3),
      this.getPoint(ctx, 0.35),
      this.getPoint(ctx, 0.4),
      this.getPoint(ctx, 0.45),
      this.getPoint(ctx, 0.5),
      this.getPoint(ctx, 0.55),
      this.getPoint(ctx, 0.6),
      this.getPoint(ctx, 0.65),
      this.getPoint(ctx, 0.7),
      this.getPoint(ctx, 0.75),
      this.getPoint(ctx, 0.8),
      this.getPoint(ctx, 0.85),
      this.getPoint(ctx, 0.9),
      this.getPoint(ctx, 0.95),
      this.getPoint(ctx, 1),
    ];
  }

  getPoint(ctx, t) {
    const p1 = this.point[1];
    const p2 = this.point[2];

    const x1 = this.lerp.get(p2.x, p1.x, t);
    const y1 = this.lerp.get(p2.y, p1.y, t);

    const p3 = this.point[2];
    const p4 = this.point[3];

    const x2 = this.lerp.get(p4.x, p3.x, t);
    const y2 = this.lerp.get(p4.y, p3.y, t);

    const cx = this.lerp.get(x2, x1, t);
    const cy = this.lerp.get(y2, y1, t);

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    return {
      x: cx,
      y: cy,
    };
  }
}
