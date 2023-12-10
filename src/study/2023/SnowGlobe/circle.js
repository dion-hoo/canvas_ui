export class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(ctx) {
    ctx.strokeStyle = "red";

    ctx.save();
    ctx.translate(this.x, this.y);

    const angle = (45 * Math.PI) / 180;
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 0.5, true);
    ctx.closePath();
    // ctx.stroke();

    ctx.restore();
  }
}
