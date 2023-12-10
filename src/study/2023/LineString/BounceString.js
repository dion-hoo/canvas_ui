import { lineCircle } from "./util.js";
import { Circle } from "./circle.js";

const BOUNCE = 0.9;

export class BounceString {
  constructor(pos, color) {
    this.circle = new Circle(innerWidth * 0.5, 100);

    const middleX = (pos.x2 - pos.x1) * 0.5 + pos.x1;
    const middleY = (pos.y2 - pos.y1) * 0.5 + pos.y1;

    const startX = (this.circle.x - pos.x1) * 0.1 + pos.x1;
    const startY = (this.circle.y - pos.y1) * 0.1 + pos.y1;

    this.points = [
      {
        x: pos.x1,
        y: pos.y1,
        ox: pos.x1,
        oy: pos.y1,
        vx: 0,
        vy: 0,
      },
      {
        x: middleX,
        y: middleY,
        ox: middleX,
        oy: middleY,
        vx: 0,
        vy: 0,
      },
      {
        x: pos.x2,
        y: pos.y2,
        ox: pos.x2,
        oy: pos.y2,
        vx: 0,
        vy: 0,
      },
    ];

    this.detect = this.circle.radius;
    this.color = color;
  }

  animate(ctx, moveX, moveY) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;

    if (
      lineCircle(
        this.points[0].x,
        this.points[0].y,
        this.points[2].x,
        this.points[2].y,
        this.circle.x,
        this.circle.y,
        this.detect
      )
    ) {
      this.detect = this.circle.radius * 2;

      let tx = (this.points[1].ox + this.circle.x) / 2;
      let ty = (this.points[1].oy + this.circle.y) / 2;

      this.points[1].vw = tx - this.points[1].x;
      this.points[1].vy = ty - this.points[1].y;

      this.circle.update(-0.5, 0.92);
    } else {
      this.detect = this.circle.radius;
      let tx = this.points[1].ox;
      let ty = this.points[1].oy;
      this.points[1].vx += tx - this.points[1].x;
      this.points[1].vx *= BOUNCE;
      this.points[1].vy += ty - this.points[1].y;
      this.points[1].vy *= BOUNCE;

      this.circle.update(0.05);
    }

    this.points[1].x += this.points[1].vx;
    this.points[1].y += this.points[1].vy;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    ctx.beginPath();
    for (let i = 0; i < this.points.length; i++) {
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.stroke();

    this.circle.draw(ctx);
  }
}
