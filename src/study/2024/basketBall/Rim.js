export class Rim {
  constructor(x, y, padding, netWidth, netGap, color) {
    this.x = x;
    this.y = y;
    this.padding = padding;
    this.netWidth = netWidth;
    this.netGap = netGap;
    this.color = color;
    this.lineWidth = 14;
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.netWidth - this.netGap, -10);
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.padding);
    ctx.lineTo(this.x + this.netWidth - this.netGap, this.y - this.padding);
    ctx.stroke();

    ctx.restore();
  }
}
