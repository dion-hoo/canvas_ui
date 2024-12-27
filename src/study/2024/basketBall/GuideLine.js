export class GuideLine {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx, target) {
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();

    ctx.restore();

    ctx.save();

    ctx.globalAlpha = 0.8;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(target.x, target.y - 13, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
