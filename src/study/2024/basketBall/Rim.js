export class Rim {
  constructor(x, y, padding, netWidth, netGap, color) {
    this.x = x;
    this.y = y;
    this.padding = padding;
    this.netWidth = netWidth;
    this.netGap = netGap;
    this.color = color;
    this.size = 10;

    this.boardWidth = 60;
    this.boardHeight = 30;

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

  pedestal(ctx) {
    // left pedestal
    ctx.save();

    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetY = 1;

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.moveTo(this.x, this.y - this.size / 2);
    ctx.lineTo(
      this.x + this.netWidth / 2 - this.netGap,
      this.y + this.boardHeight - this.boardHeight * 0.25
    );
    ctx.stroke();

    // right pedestal
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.moveTo(this.x + this.netWidth, this.y - this.size / 2);
    ctx.lineTo(
      this.x + this.netWidth - this.netWidth / 2 + this.netGap,
      this.y + this.boardHeight - this.boardHeight * 0.25
    );
    ctx.stroke();
    ctx.restore();
  }

  draw(ctx) {
    ctx.save();

    ctx.globalAlpha = 0.35;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(
      this.x + this.netWidth / 2 - this.boardWidth / 2,
      this.y,
      this.boardWidth,
      this.boardHeight
    );
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.netWidth, -this.size);
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.padding / 1.3);
    ctx.lineTo(this.x + this.netWidth, this.y - this.padding / 1.3);
    ctx.stroke();
    ctx.restore();
  }
}
