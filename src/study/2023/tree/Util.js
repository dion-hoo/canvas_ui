export class Util {
  constructor() {}

  lerp(i, j, t) {
    return (1 - t) * i + t * j;
  }

  vw(width, standard = 375, min = 0, max = 9999) {
    return Math.max(min, Math.min((width * innerWidth) / standard, max));
  }

  getPoint(x1, y1, x2, y2, x3, y3, t) {
    const cx = this.lerp(x1, x2, t);
    const cy = this.lerp(y1, y2, t);

    const px = this.lerp(x2, x3, t);
    const py = this.lerp(y2, y3, t);

    const x = this.lerp(cx, px, t);
    const y = this.lerp(cy, py, t);

    return { x: x, y: y };
  }
}

export const util = new Util();
