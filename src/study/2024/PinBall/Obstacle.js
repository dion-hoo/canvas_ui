export class Obstacle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(ctx) {
    ctx.save();

    ctx.shadowColor = "#666";
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 2;

    ctx.fillStyle = "#ccc";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
