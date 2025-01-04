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
    ctx.lineWidth = innerHeight * 0.0007;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();

    ctx.restore();

    ctx.save();

    ctx.globalAlpha = 0.5;

    const radius = innerHeight * 0.0045;

    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const radian = Math.atan2(dy, dx);

    const x = target.x + Math.cos(radian) * 10;
    const y = target.y + Math.sin(radian) * 10;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
