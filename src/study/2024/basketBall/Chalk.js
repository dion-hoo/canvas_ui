export class Chalk {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 400;
    this.height = 270;

    this.space = 30;
    this.perspective = 250;
    this.ratio = this.perspective / this.width;

    this.color = 0;
  }

  leftSide(ctx) {
    ctx.fillStyle = this.color;
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
    ctx.fillStyle = this.color;
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
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x - this.width + this.perspective, this.y - this.height);
    ctx.lineTo(this.x + this.width - this.perspective, this.y - this.height);

    ctx.stroke();
  }

  draw(ctx, score, color) {
    ctx.save();
    if (score !== 0) {
      ctx.shadowBlur = 20;
      ctx.shadowColor = color;
    }

    this.leftSide(ctx);
    this.rightSide(ctx);
    this.center(ctx);

    this.color = color;

    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, this.y - this.height);
    ctx.lineTo(innerWidth, this.y - this.height - 1);
    ctx.stroke();

    ctx.restore();
  }
}
