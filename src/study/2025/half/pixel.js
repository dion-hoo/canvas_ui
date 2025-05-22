export class Pixel {
  constructor(image, x, y, gap, size) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.gap = gap;
    this.size = size;

    this.scale = image.width / this.size;

    const centerX = innerWidth / 2 - size / 2;
    const centerY = innerHeight / 2 - size / 2;

    this.sx = (this.x - centerX) * this.scale;
    this.sy = (this.y - centerY) * this.scale;
    this.sw = this.gap * this.scale;
    this.sh = this.gap * this.scale;

    this.destX = this.x;
    this.destY = this.y;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.strokeRect(this.x, this.y, this.gap, this.gap);
    ctx.stroke();

    ctx.drawImage(
      this.image,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.destX,
      this.destY,
      this.gap,
      this.gap
    );

    ctx.restore();
  }
}
