export class Boom {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius * 3;
    this.image = new Image();
    this.image.src = "./boom.png";
    this.scale = 0;
    this.opacity = 1;

    this.image.onload = () => {
      this.loaded = true;
    };
  }

  draw(ctx) {
    if (this.loaded) {
      this.scale += 0.1;
      this.opacity -= 0.03;

      if (this.scale > 2) {
        this.scale = 2;
      }

      if (this.opacity < 0) {
        this.opacity = 0;
      }

      ctx.save();

      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);
      ctx.drawImage(
        this.image,
        -this.radius / 2,
        -this.radius / 2,
        this.radius,
        this.radius
      );
      ctx.restore();
    }
  }
}
