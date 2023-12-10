export class Util {
  constructor() {}

  lerp(j, k, r) {
    return j * (1 - r) + k * r;
  }

  dist(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(dx * dx + dy * dy);
  }

  projection(ctx, x1, y1, x2, y2, cx, cy, r) {
    const length = this.dist(x1, y1, x2, y2);
    const vec1 = {
      x: cx - x1,
      y: cy - y1,
    };
    const vec2 = {
      x: x2 - x1,
      y: y2 - y1,
    };

    const result = (vec1.x * vec2.x + vec1.y * vec2.y) / Math.pow(length, 2);
    const projection = result < 0 || result > 1 ? 0.5 : result;
    const px = x1 + projection * vec2.x;
    const py = y1 + projection * vec2.y;

    const dist = this.dist(cx, cy, px, py);

    // ctx.beginPath();
    // ctx.fillStyle = "blue";
    // ctx.arc(px, py, 5, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    return {
      x: Math.floor(px),
      y: Math.floor(py),
      detect: dist < r ? true : false,
    };
  }
}

export const util = new Util();
