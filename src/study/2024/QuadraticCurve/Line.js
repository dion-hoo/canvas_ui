export class Line {
  constructor(x, y, size) {
    this.startX = x;
    this.startY = y;
    this.size = size;

    this.endX = x;
    this.endY = y - size;

    this.centerX = x + 300;
    this.centerY = (this.startY + this.endY) / 2;

    this.time = 0;
  }

  lerp(p1, p2, t) {
    return (1 - t) * p1 + t * p2;
  }

  update(ctx, time) {
    const bezierX =
      (1 - time) ** 2 * this.startX +
      2 * time * (1 - time) * this.centerX +
      time * time * this.endX;
    const bezierY =
      (1 - time) ** 2 * this.startY +
      2 * time * (1 - time) * this.centerY +
      time * time * this.endY;

    const x1 = this.lerp(this.startX, this.centerX, 0);
    const y1 = this.lerp(this.startY, this.centerY, 0);

    const x2 = this.lerp(this.centerX, this.endX, 0);
    const y2 = this.lerp(this.centerY, this.endY, 0);

    const cx = this.lerp(x1, x2, time);
    const cy = this.lerp(y1, y2, time);

    ctx.quadraticCurveTo(cx, cy, bezierX, bezierY);

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(bezierX, bezierY, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  draw(ctx) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);

    // ctx.quadraticCurveTo(this.centerX, this.centerY, this.endX, this.endY);

    this.update(ctx, this.time);

    this.time += 0.01;

    if (this.time > 1) {
      this.time = 1;
    }

    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "#f00";
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
