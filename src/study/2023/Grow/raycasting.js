export class Raycasting {
  constructor() {}

  draw(target, point) {
    let isIntersection = false;

    for (let i = 0, j = point.length - 1; i < point.length; j = i++) {
      const p1 = point[i];
      const p2 = point[j];

      const x =
        target.x < p1.x + ((target.y - p1.y) / (p2.y - p1.y)) * (p2.x - p1.x);
      const y = target.y < p1.y !== target.y < p2.y;

      if (x && y) {
        isIntersection = !isIntersection;
      }
    }

    return isIntersection;
  }
}
