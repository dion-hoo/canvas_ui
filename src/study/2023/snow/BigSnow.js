export class BigSnow {
  constructor(x, y, radius, angle) {
    this.x = x;
    this.fixedX = x;
    this.y = y;
    this.angle = (angle * Math.PI) / 180;
    this.amplitude = innerWidth;
    this.radius = radius;
    this.fixedRadius = radius;
    this.lifecycle = false;
    this.speed = Math.random() * 0.001 + 0.003;
    this.size = Math.random() * 0.2 + 0.2;

    this.vx = Math.random() * 10 + 5;
  }

  update() {
    this.angle += this.speed;
    this.radius += this.size;

    this.x = this.fixedX + Math.sin(this.angle) * this.amplitude;
    this.y += this.fixedRadius * 0.01;

    if (
      this.y > innerHeight + this.radius ||
      this.x < -this.radius ||
      this.x > innerWidth + this.radius
    ) {
      this.lifecycle = true;
    }
  }

  draw(ctx, image) {
    ctx.save();
    ctx.filter = `blur(8px)`;

    ctx.drawImage(image, this.x, this.y, this.radius, this.radius);
    ctx.restore();
  }
}
