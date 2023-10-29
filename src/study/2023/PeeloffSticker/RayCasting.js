export class RayCasting {
  constructor(point) {
    this.point = point;
  }

  check(p) {
    let isPass = false;

    for (let i = 0, j = this.point.length - 1; i < this.point.length; j = i++) {
      const p1 = this.point[i];
      const p2 = this.point[j];

      const x = p.x < p1.x + ((p.y - p1.y) / (p2.y - p1.y)) * (p2.x - p1.x);
      const y = p.y < p2.y !== p.y < p1.y;

      if (x && y) {
        isPass = !isPass;
      }
    }

    return isPass;
  }
}
