export class Point {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.color = "#fff";
  }

  update(mouse) {
    this.x = mouse.x;
    this.y = mouse.y;
  }

  getArea(p1, p2, p3) {
    const x1 = p2.x - p1.x;
    const y1 = p2.y - p1.y;

    const x2 = p3.x - p1.x;
    const y2 = p3.y - p1.y;

    return Math.abs((x1 * y2 - x2 * y1) / 2);
  }

  getVerticalDistance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const num =
      (p2.y - p1.y) * this.x -
      (p2.x - p1.x) * this.y +
      p2.x * p1.y -
      p2.y * p1.x;

    return Math.abs(num / dist);
  }

  checkTriangle(p1, p2, p3) {
    const distances = [
      this.getVerticalDistance(p1, p2),
      this.getVerticalDistance(p2, p3),
      this.getVerticalDistance(p3, p1),
    ];

    return distances.every((d) => d >= this.radius);
  }

  check(triangle) {
    const triangleList = triangle.arr;

    const p1 = triangleList[0];
    const p2 = triangleList[1];
    const p3 = triangleList[2];
    const point = { x: this.x, y: this.y };

    const totalArea = this.getArea(p1, p2, p3);

    const area1 = this.getArea(p1, p2, point);
    const area2 = this.getArea(p2, p3, point);
    const area3 = this.getArea(p3, p1, point);

    const isSameArea = Math.abs(totalArea - (area1 + area2 + area3)) < 0.000001;
    const isFar = this.checkTriangle(p1, p2, p3);
    const isInner = isSameArea && isFar;

    this.color = isInner ? "red" : "#fff";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
