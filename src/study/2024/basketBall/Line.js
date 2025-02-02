export class Line {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = innerWidth * 0.4;
    this.height = innerHeight * 0.6;

    this.space = innerWidth * 0.1;
    this.perspective = this.width * 0.7;
    this.ratio = this.perspective / this.width;

    this.startColor = color;
  }

  setGradient(ctx, x) {
    const gradient = ctx.createLinearGradient(this.x, this.y, x, this.height);

    gradient.addColorStop(0, this.startColor);
    gradient.addColorStop(1, "#000");

    return gradient;
  }

  leftSide(ctx) {
    const x =
      this.x - this.width + this.perspective + this.space - this.space / 2;
    const color = this.setGradient(ctx, x);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(this.x - this.width, this.y);
    ctx.lineTo(
      this.x - this.width + this.perspective + this.space - this.space / 2,
      this.y - this.height
    );
    ctx.lineTo(
      this.x - this.width + this.perspective + this.space - this.space * 0.4,
      this.y - this.height
    );
    ctx.lineTo(this.x - this.width + this.space - this.space * 0.4, this.y);
    ctx.lineTo(this.x - this.width, this.y);
    ctx.fill();
  }

  rightSide(ctx) {
    const x =
      this.x + this.width - this.perspective - this.space + this.space / 2;
    const color = this.setGradient(ctx, x);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width, this.y);
    ctx.lineTo(
      this.x + this.width - this.perspective - this.space + this.space / 2,
      this.y - this.height
    );
    ctx.lineTo(
      this.x + this.width - this.perspective - this.space + this.space * 0.4,
      this.y - this.height
    );
    ctx.lineTo(this.x + this.width - this.space + this.space * 0.4, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.fill();
  }

  draw(ctx) {
    ctx.save();

    this.leftSide(ctx);
    this.rightSide(ctx);

    ctx.restore();
  }
}
