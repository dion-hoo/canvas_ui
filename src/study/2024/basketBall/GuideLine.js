export class GuideLine {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx, target) {
    const dashedValue = innerHeight * 0.0036;

    ctx.save();
    ctx.setLineDash([dashedValue, dashedValue]);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();

    ctx.restore();

    ctx.save();

    ctx.globalAlpha = 0.8;

    const radius = innerHeight * 0.0045;
    const padding = innerHeight * 0.0093;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(target.x, target.y - padding, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
