import { Projection } from "./projection.js";

export class Line {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = x + width;
    this.damping = 0.92;

    this.x1 = x;
    this.y1 = this.y;
    this.x2 = this.width;
    this.y2 = this.y;
    this.cx = this.x1 + (this.x2 - this.x1) / 2;
    this.cy = this.y1 + (this.y2 - this.y1) / 2;

    this.color = 0;

    this.isDetect = false;
    this.detectDistance = 0;

    this.point = [
      {
        x: this.x1,
        y: this.y1,
        ox: this.x1,
        oy: this.y1,
        vx: 0,
        vy: 0,
      },
      {
        x: this.cx,
        y: this.cy,
        ox: this.cx,
        oy: this.cy,
        vx: 0,
        vy: 0,
      },
      {
        x: this.x2,
        y: this.y2,
        ox: this.x2,
        oy: this.y2,
        vx: 0,
        vy: 0,
      },
    ];
  }

  update(ctx, mouse) {
    const { detectDistance, detect } = Projection(
      ctx,
      this.x1,
      this.y1,
      this.x2,
      this.y2,
      mouse.x,
      mouse.y
    );

    if (detect) {
      const ty = (this.point[1].oy + mouse.y) * 0.5;

      this.point[1].vy = (ty - this.point[1].y) / 10;

      this.color += 30;
    } else {
      const ty = this.point[1].oy - this.point[1].y;

      this.point[1].vy *= this.damping;

      this.point[1].vy += ty;
    }

    this.detectDistance = detectDistance;
    this.isDetect = detect;
    this.point[1].y += this.point[1].vy;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = `hsl(${this.color}, 50%, 50%)`;
    ctx.lineWidth = 2;
    ctx.beginPath();

    let prevX = this.point[0].x;
    let prevY = this.point[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.point.length; i++) {
      const p = this.point[i];

      const cx = (prevX + p.x) / 2;
      const cy = (prevY + p.y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = p.x;
      prevY = p.y;
    }
    ctx.lineTo(this.width, this.y);

    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}
