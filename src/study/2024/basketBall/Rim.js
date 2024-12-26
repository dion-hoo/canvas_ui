export class Rim {
  constructor(x, y, netWidth, netGap, color) {
    this.x = x;
    this.y = y;
    this.padding = 6;
    this.netWidth = netWidth;
    this.netGap = netGap;
    this.color = color;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.padding);
    ctx.lineTo(this.x + this.netWidth - this.netGap, this.y - this.padding);
    ctx.stroke();
    ctx.restore();
  }
}
