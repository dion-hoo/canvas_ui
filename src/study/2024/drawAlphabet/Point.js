export class Point {
  constructor({ index, x, y, isMoveTo = false, isCurve = false }) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.radius = 4;

    this.time = 0;
    this.timeSpeed = 0.04;

    this.isMoveTo = isMoveTo;
    this.isCurve = isCurve;

    this.angle = index === 2 || index === 10 ? 90 : 0;
  }

  drawLine(ctx) {
    const length = 70;

    ctx.save();

    ctx.translate(this.x, this.y);

    const radian = (this.angle * Math.PI) / 180;

    ctx.rotate(radian);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-length / 2, 0);
    ctx.lineTo(length / 2, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(-length / 2, 0, 2, 0, Math.PI * 2);
    ctx.arc(length / 2, 0, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
