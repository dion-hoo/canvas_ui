export class Rim {
  constructor(x, y, padding, netWidth, netGap, color) {
    this.x = x;
    this.y = y;
    this.padding = padding;
    this.netWidth = netWidth;
    this.netGap = netGap;
    this.color = color;
    this.size = 10;

    this.hitRimArea = [];

    this.hitRimArea[0] = {
      x: this.x,
      y: this.y,
    };
    this.hitRimArea[1] = {
      x: this.x,
      y: this.y + 100,
    };
  }

  drawRimArea(ctx) {
    for (let i = 0; i < this.hitRimArea.length - 1; i++) {
      const p1 = this.hitRimArea[i];
      const p2 = this.hitRimArea[i + 1];

      // ctx.beginPath();
      // ctx.strokeStyle = "blue";
      // ctx.lineWidth = 2;
      // ctx.moveTo(p1.x, p1.y);
      // ctx.lineTo(p2.x, p2.y);
      // ctx.stroke();
    }
  }

  draw(ctx) {
    ctx.save();

    ctx.save();
    ctx.globalAlpha = 0.35;

    const width = 60;
    const height = 30;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(
      this.x + this.netWidth / 2 - width / 2 - this.netGap / 2,
      this.y,
      width,
      height
    );
    ctx.fill();

    // left pedestal
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.moveTo(this.x, this.y - 3);
    ctx.lineTo(
      this.x + this.netWidth / 2 - width / 2,
      this.y + height - height * 0.2
    );
    ctx.stroke();

    // right pedestal
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.moveTo(this.x + this.netWidth - this.netGap, this.y - 3);
    ctx.lineTo(
      this.x + this.netWidth / 2 + this.netGap / 2,
      this.y + height - height * 0.2
    );
    ctx.stroke();

    ctx.restore();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.netWidth - this.netGap, -this.size);
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.padding);
    ctx.lineTo(this.x + this.netWidth - this.netGap, this.y - this.padding);
    ctx.stroke();

    ctx.restore();
  }
}
