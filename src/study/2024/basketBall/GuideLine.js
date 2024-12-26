export class GuideLine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, target) {
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
    ctx.restore();
  }
}
