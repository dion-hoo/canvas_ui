export class GuideLine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, target) {
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
    ctx.restore();
  }
}
