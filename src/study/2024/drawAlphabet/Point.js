export class Point {
  constructor({ x, y, isMoveTo = false, isCurve = false }) {
    this.x = x;
    this.y = y;
    this.radius = 10;

    this.time = 0;
    this.timeSpeed = 0.025;

    this.isMoveTo = isMoveTo;
    this.isCurve = isCurve;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
