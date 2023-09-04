export class RayCasting {
  constructor(target, points) {
    this.target = target;
    this.points = points;
  }

  inside() {
    let isInside = false;
    for (
      let i = 0, j = this.points.length - 1;
      i < this.points.length;
      j = i++
    ) {
      const r1 = this.points[i];
      const r2 = this.points[j];

      const x =
        this.target.x <
        r1.x + ((this.target.y - r1.y) / (r2.y - r1.y)) * (r2.x - r1.x);
      const y = this.target.y < r1.y !== this.target.y < r2.y;

      const intersect = x && y;

      if (intersect) {
        isInside = !isInside;
      }
    }

    return isInside;
  }
}
