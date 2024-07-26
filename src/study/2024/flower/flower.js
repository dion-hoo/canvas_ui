export class Flower {
  constructor(index, image, x, y, wind) {
    this.index = index;
    this.image = image;
    this.size = 100;
    this.scale = 0;

    this.x = x;
    this.y = y;

    this.vy = Math.random() * 8 + 4;

    this.wind = wind;
    this.spin = 0;
    this.fallSpinDirection = Math.random() > 0.5 ? 1 : -1;
  }

  draw(ctx, isEnd, inputValue) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (inputValue === "wind") {
      this.spin += this.wind.x;
      const radian = Math.sin(this.index + this.spin) * 0.2;
      ctx.rotate(radian);
    }

    if (inputValue === "fall") {
      this.y += this.vy;

      this.spin += 0.03 * this.fallSpinDirection;
      ctx.rotate(this.spin);
    }

    if (isEnd) {
      if (this.scale >= 1) {
        this.scale = 1;
      } else {
        this.scale += 0.08;
      }
    }

    ctx.scale(this.scale, this.scale);

    ctx.drawImage(
      this.image,
      -this.size / 2,
      -this.size / 2 - 10,
      this.size,
      this.size
    );

    ctx.restore();
  }
}
