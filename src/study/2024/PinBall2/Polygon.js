import { checkPoint } from "./CheckPoint.js";

export class Polygon {
  constructor(x, y, vertex, size, rotate = 0) {
    this.x = x;
    this.y = y;
    this.vertex = vertex;
    this.size = size;
    this.rotate = rotate;
    this.polygonRadian = (this.rotate * Math.PI) / 180;

    this.points = [];
    this.angle = 0;
    this.operation = "<";

    const degree = 360 / this.vertex;
    const radian = (degree * Math.PI) / 180;

    for (let i = 0; i < this.vertex; i++) {
      const x = Math.cos(radian * i + this.polygonRadian) * this.size;
      const y = Math.sin(radian * i + this.polygonRadian) * this.size;

      this.points.push({ x: this.x + x, y: this.y + y });
    }
  }

  getAdjustPoint(point, p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const direction = {
      x: dx / dist,
      y: dy / dist,
    };
    const normal = {
      x: direction.y,
      y: -direction.x,
    };
    const size = point.radius;

    const addition = {
      x: normal.x * size,
      y: normal.y * size,
    };
    const newP1 = {
      x: p1.x + addition.x,
      y: p1.y + addition.y,
    };
    const newP2 = {
      x: p2.x + addition.x,
      y: p2.y + addition.y,
    };

    return {
      dx,
      dy,
      normal,
      direction,
      newP1,
      newP2,
    };
  }

  collision(ctx, point) {
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      const p2 = this.points[(i + 1) % this.points.length];

      const { dx, dy, normal, direction, newP1, newP2 } = this.getAdjustPoint(
        point,
        p1,
        p2
      );

      // checkPoint(ctx, newP1.x, newP1.y, "#1c9");
      // checkPoint(ctx, newP2.x, newP2.y, "#19c");

      const epsilon = 0.1;
      const diifY = Math.abs(newP2.y - newP1.y);

      const minX = Math.min(p1.x, p2.x);
      const maxX = Math.max(p1.x, p2.x);
      const isXrange = minX < point.x && point.x < maxX;

      if (isXrange) {
        const minY = Math.min(p1.y, p2.y);

        if (minY - point.radius < point.y) {
          const dot = point.vx * direction.x + point.vy * direction.y;

          if (dot < 0) {
            this.operation = ">";
          } else {
            this.operation = "<";
          }
        }
      }

      if (diifY < epsilon) {
        const min = Math.min(p1.x, p2.x);
        const max = Math.max(p1.x, p2.x);

        const x = min < point.x && point.x < max;
        const y = point.y + point.radius > p1.y;

        if (x && y) {
          // point.isIntersection = true;

          this.updatePoint(point, normal);
        }
      } else {
        const xMap = {
          ">": (a, b) => a > b,
          "<": (a, b) => a < b,
        };
        const compare = xMap[this.operation];

        const xRatio =
          newP1.x +
          ((point.y - newP1.y) / (newP2.y - newP1.y)) * (newP2.x - newP1.x);
        const x = compare(point.x, xRatio);
        const y = point.y < newP1.y !== point.y < newP2.y;

        if (x && y) {
          // point.isIntersection = true;

          this.updatePoint(point, normal);
        }
      }
    }
  }

  updatePoint(point, normal) {
    const dot = point.vx * normal.x + point.vy * normal.y;

    point.vx = point.vx - 2 * dot * normal.x;
    point.vy = point.vy - 2 * dot * normal.y;

    point.oldX = point.x - point.vx;
    point.oldY = point.y - point.vy;
  }

  rotation() {
    const cx = this.x;
    const cy = this.y;

    // this.angle = 0.003;

    this.points.forEach((p) => {
      const tx = p.x - cx;
      const ty = p.y - cy;

      const rotateX = tx * Math.cos(this.angle) - ty * Math.sin(this.angle);
      const rotateY = ty * Math.cos(this.angle) + tx * Math.sin(this.angle);

      p.x = cx + rotateX;
      p.y = cy + rotateY;
    });
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();

    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i];

      ctx.lineTo(point.x, point.y);
    }

    ctx.fill();
    ctx.closePath();

    // checkPoint(ctx, this.points[0].x, this.points[0].y, "red");
    // checkPoint(ctx, this.points[1].x, this.points[1].y, "orange");
    // checkPoint(ctx, this.points[2].x, this.points[2].y, "purple");
  }
}
