export class Util {
  constructor() {}

  lerp(i, j, t) {
    return i * (1 - t) + j * t;
  }

  dist(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance;
  }

  raycasting(target, point) {
    let isPass = false;

    for (let i = 0, j = point.length - 1; i < point.length; j = i++) {
      const p1 = point[i];
      const p2 = point[j];

      const x =
        target.x < p1.x + ((target.y - p1.y) / (p2.y - p1.y)) * (p2.x - p1.x);
      const y = target.y < p2.y !== target.y < p1.y;

      if (x && y) {
        isPass = !isPass;
      }
    }

    return isPass;
  }

  projection(x1, y1, x2, y2, cx, cy) {
    const length = this.dist(x1, y1, x2, y2);
    const vec1 = {
      x: cx - x1,
      y: cy - y1,
    };
    const vec2 = {
      x: x2 - x1,
      y: y2 - y1,
    };

    const dot = (vec1.x * vec2.x + vec1.y * vec2.y) / length;
    const result = dot / length;
    const px = x1 + result * vec2.x;
    const py = y1 + result * vec2.y;

    return {
      x: px,
      y: py,
      isOverX: px < x1,
      isOverY: py > y2,
    };
  }
}

export const util = new Util();
