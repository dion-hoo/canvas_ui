export class Raycasting {
  constructor(point, line) {
    this.point = point;
    this.line = line;
  }

  update() {
    let isInside = false;

    for (let i = 0, j = this.line.length - 1; i < this.line.length; j = i++) {
      const p1 = this.line[i];
      const p2 = this.line[j];

      const x =
        this.point.x <
        p1.x + ((this.point.y - p1.y) / (p2.y - p1.y)) * (p2.x - p1.x);

      const y = this.point.y < p1.y !== this.point.y < p2.y;

      if (x && y) {
        isInside = !isInside;
      }
    }

    return isInside;
  }
}
