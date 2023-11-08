export class Snow {
  constructor(x, y, radius) {
    this.x = x;
    this.fixedX = x;
    this.y = y;
    this.radius = radius;
    this.mass = this.radius / 20;
    this.lifecycle = false;

    this.angle = Math.random() * ((360 * Math.PI) / 180);
    this.amplitude = Math.sqrt(
      Math.pow(Math.random() * (innerWidth * 0.13), 2)
    );

    this.opacity = this.radius < 30 ? Math.random() * 0.1 + 0.1 : 0.4;
  }

  update() {
    this.angle += 0.01;

    this.x = this.fixedX + Math.sin(this.angle) * this.amplitude;
    this.y += this.mass;

    if (this.y > innerHeight + this.radius) {
      this.lifecycle = true;
    }
  }

  draw(ctx, image) {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    ctx.drawImage(image, this.x, this.y, this.radius, this.radius);

    ctx.restore();
  }
}
