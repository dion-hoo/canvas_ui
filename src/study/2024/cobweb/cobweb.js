import { Point } from "./Point.js";

export class Cobweb {
  constructor(x, y, sides, size, gap, curveRadius, lineWidth) {
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.size = size;
    this.curveRadius = curveRadius;
    this.lineWidth = lineWidth;
    this.gap = gap;

    const degree = 360 / this.sides;

    this.count = 7;

    this.distance = new Array(this.count);
    this.points = new Array(this.count);

    for (let i = 0; i < this.count; i++) {
      this.points[i] = new Array(this.sides);
      this.distance[i] = new Array(this.sides);
    }

    for (let i = 0; i < this.count; i++) {
      for (let j = 0; j < this.sides; j++) {
        const radian = (degree * j * Math.PI) / 180;
        const size = this.size - i * this.gap;
        const curve = this.curveRadius - i * 6;

        const x = Math.cos(radian) * size;
        const y = Math.sin(radian) * size;

        this.points[i][j] = new Point(x, y, 1, curve);
      }
    }

    for (let i = 0; i < this.count; i++) {
      const point = this.points[i];

      for (let j = 0, k = point.length - 1; j < point.length; k = j++) {
        const p1 = point[j];
        const p2 = point[k];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        this.distance[i][j] = dist;
      }
    }
  }

  lerp(p1, p2, d1) {
    return (1 - d1) * p1 + d1 * p2;
  }

  draw(ctx, mouse, angle) {
    ctx.save();
    ctx.translate(this.x, this.y);

    const radian = (angle * Math.PI) / 180;
    ctx.rotate(radian);

    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = "#aeaeae";

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];

      for (let j = 0, k = point.length - 1; j < point.length; k = j++) {
        const p1 = point[j];
        const p2 = point[k];
        const dist = this.distance[i][j];

        ctx.beginPath();
        for (let z = 0, h = z; z < this.count; h = z++) {
          const startX = this.points[h][j].x;
          const startY = this.points[h][j].y;

          const endX = this.points[z][j].x;
          const endY = this.points[z][j].y;

          const c1 = this.points[h][j];
          const c2 = this.points[z][j];

          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);

          c1.restrict(c2, 40);
        }
        ctx.stroke();

        p1.restrict(p2, dist);
        p1.update(1);
        p1.move(ctx, this.x, this.y, mouse);
        p1.draw(ctx);

        const dx = 0 - p1.x;
        const dy = 0 - p1.y;
        const centerDiatance = Math.sqrt(dx * dx + dy * dy);
        const normarlize = {
          x: dx / centerDiatance,
          y: dy / centerDiatance,
        };

        const move = {
          x: p1.curve * normarlize.x,
          y: p1.curve * normarlize.y,
        };

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);

        const cx = (p1.x + p2.x) / 2 + move.x;
        const cy = (p1.y + p2.y) / 2 + move.y;

        ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    ctx.restore();
  }
}
