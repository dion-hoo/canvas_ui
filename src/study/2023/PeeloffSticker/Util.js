export class Util {
  constructor() {}

  lerp(i, j, t) {
    return i * (1 - t) + j * t;
  }

  dist(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance;
  }
}
