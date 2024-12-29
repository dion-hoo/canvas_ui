export class Chalk {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 400;
    this.height = 270;

    this.space = 30;
    this.perspective = 250;
    this.ratio = this.perspective / this.width;
  }

  leftSide(ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.beginPath();
    ctx.moveTo(this.x - this.width, this.y);
    ctx.lineTo(this.x - this.width + this.perspective, this.y - this.height);
    ctx.lineTo(
      this.x - this.width + this.perspective + this.space,
      this.y - this.height
    );
    ctx.lineTo(
      this.x - this.width + this.space + this.space * this.ratio,
      this.y
    );
    ctx.fill();
  }

  rightSide(ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.beginPath();
    ctx.moveTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width - this.perspective, this.y - this.height);
    ctx.lineTo(
      this.x + this.width - this.perspective + this.space,
      this.y - this.height
    );
    ctx.lineTo(
      this.x + this.width + this.space + this.space * this.ratio,
      this.y
    );

    ctx.fill();
  }

  center(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.moveTo(this.x - this.width + this.perspective, this.y - this.height);
    ctx.lineTo(this.x + this.width - this.perspective, this.y - this.height);

    ctx.stroke();
  }

  draw(ctx) {
    this.leftSide(ctx);
    this.rightSide(ctx);
    this.center(ctx);
  }
}
