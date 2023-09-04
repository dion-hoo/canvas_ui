export class Back {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;

    this.v0 = null;
    this.v1 = null;
    this.v2 = null;
    this.v3 = null;
    this.v4 = null;
  }

  update(v0, v1, v2, v3, v4) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.v4 = v4;
    this.v5 = {
      x: this.v4.x,
      y: this.y + this.height,
    };
  }

  drawImage(ctx) {
    ctx.clip();

    ctx.save();
    ctx.translate(this.v0.x, this.v2.y);
    ctx.scale(-1, 1);
    ctx.rotate((90 * Math.PI) / 180);
    ctx.drawImage(this.image, -this.width, 0, this.width, this.height);

    ctx.restore();
  }

  backPath(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.v0.x, this.v0.y);
    ctx.quadraticCurveTo(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.quadraticCurveTo(this.v3.x, this.v3.y, this.v4.x, this.v4.y);
    ctx.lineTo(this.v4.x, this.v4.y);

    if (this.v4.overY) {
      ctx.lineTo(this.v5.x, this.v5.y);
    }
    ctx.closePath();
  }

  drawShadow(ctx) {
    const gradient = ctx.createLinearGradient(
      this.v3.x,
      this.v3.y,
      this.v3.x,
      this.v4.y
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(0.6, "rgba(0, 0, 0, 0.3)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.01)");
    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.moveTo(this.v2.x, this.v2.y);
    ctx.quadraticCurveTo(this.v3.x, this.v3.y, this.v4.x, this.v4.y);
    ctx.lineTo(this.v4.x, this.v4.y);
    ctx.fill();

    ctx.closePath();
  }

  draw(ctx) {
    // shadow
    ctx.save();
    this.drawShadow(ctx);
    ctx.restore();

    // back
    ctx.save();
    this.backPath(ctx);
    this.drawImage(ctx);
    ctx.restore();
  }
}
