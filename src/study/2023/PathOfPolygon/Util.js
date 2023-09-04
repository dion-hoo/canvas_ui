export class Util {
  constructor() {}

  lerp(j, k, r) {
    return j * (1 - r) + k * r;
  }

  dist(d1, d2) {
    const dx = d2.x - d1.x;
    const dy = d2.y - d1.y;

    return Math.sqrt(dx * dx + dy * dy);
  }
}
