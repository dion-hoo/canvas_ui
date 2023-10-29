export class Arrow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.height = 4;
  }

  draw(ctx) {
    this.angle += 0.1;

    this.y += Math.sin(this.angle) * this.height;

    ctx.save();
    ctx.shadowColor = "yellow";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 1;

    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
