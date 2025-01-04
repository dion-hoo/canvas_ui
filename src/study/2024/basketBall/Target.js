export class Taregt {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.angle = 0;
  }

  draw(ctx) {
    ctx.save();

    const blurValue = Math.sin(this.angle) * 20;

    this.angle += 0.1;

    ctx.shadowBlur = innerHeight * 0.01 + blurValue;
    ctx.shadowColor = this.color;

    ctx.strokeStyle = this.color;
    ctx.lineWidth = innerHeight * 0.013;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }
}
