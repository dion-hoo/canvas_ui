import { Circle } from "./Circle.js";

export class Wave {
  constructor(totalCircle, color) {
    this.totalCircle = totalCircle;
    this.color = color;
    this.circle = [];
    this.dots = [];

    for (let i = 0; i < this.totalCircle; i++) {
      const radius = 10;
      const x = (innerWidth / (this.totalCircle - 1)) * i;
      const y = innerHeight;

      this.circle.push(new Circle(i + 1, x, y, radius));
    }
  }

  update() {
    this.circle.forEach((c) => {
      c.slideUp();
    });
  }

  updateColor(time) {
    if (time > 7900) {
      this.color = "#ffeb00";
    }

    if (time > 9000) {
      this.color = "#0064ff";
    }

    if (time > 10100) {
      this.color = "#05d686";
    }

    if (time > 12000) {
      this.color = "#323232";
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    let cur = this.circle[0];
    let prev = cur;

    let prevCx = cur.x;
    let prevCy = cur.y;

    this.dots = [];

    ctx.beginPath();
    ctx.moveTo(cur.x, cur.y);
    for (let i = 0; i < this.circle.length; i++) {
      cur = this.circle[i];

      cur.update();

      const cx = (cur.x + prev.x) / 2;
      const cy = (cur.y + prev.y) / 2;

      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      this.dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      });

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    const length = this.circle.length - 1;
    const lastCx = (this.circle[length].x + prev.x) / 2;
    const lastCy = (this.circle[length].y + prev.y) / 2;

    ctx.lineTo(this.circle[length].x, this.circle[length].y);

    this.dots.push({
      x1: prevCx,
      y1: prevCy,
      x2: prev.x,
      y2: prev.y,
      x3: lastCx,
      y3: lastCy,
    });

    ctx.lineTo(innerWidth, innerHeight);
    ctx.lineTo(0, innerHeight);

    ctx.fill();
    ctx.closePath();
  }
}
