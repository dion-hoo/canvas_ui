export class Line {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = innerWidth * 0.4;
    this.height = innerHeight * 0.6;

    this.space = innerWidth * 0.1;
    this.perspective = this.width * 0.7;
    this.ratio = this.perspective / this.width;

    this.color = "rgba(255, 255, 255, 0.1)";
  }

  leftSide(ctx) {
    ctx.fillStyle = this.color;
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
    ctx.fillStyle = this.color;
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

    ctx.shadowBlur = 5;
    ctx.shadowColor = this.color;

    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.width,
      this.height
    );

    gradient.addColorStop(0, "#19c");
    gradient.addColorStop(1, "#000");

    this.color = gradient;

    this.leftSide(ctx);
    this.rightSide(ctx);

    ctx.restore();
  }
}
