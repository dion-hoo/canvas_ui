export class Petal {
  constructor(image, x, y, radius) {
    this.image = image;
    this.x = x;
    this.fixedX = x;
    this.y = y;
    this.vx = 0;
    this.vy = Math.random() * 1 + 1;
    this.radius = radius;
    this.length = innerWidth * 0.5;
    this.direction = Math.random() > 0.5 ? 1 : -1;

    this.angle = 0;
    this.angleSpeed = Math.random() * 0.0005 + 0.001;

    this.rotation = 0;
    this.rotationSpeed = Math.random() * 0.02 + 0.01;

    this.isEnd = false;
  }

  update(inputValue) {
    if (inputValue) {
      this.angle += 0.02;
      this.length = innerWidth * 0.2;
    } else {
      this.angle += this.angleSpeed;
    }

    this.x = this.fixedX + Math.sin(this.angle * this.direction) * this.length;
    this.y += this.vy;

    if (this.y > innerHeight + this.radius) {
      this.y = -this.radius;

      this.isEnd = true;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "#f00";
    ctx.translate(this.x, this.y);

    this.rotation += this.rotationSpeed;

    ctx.rotate(this.rotation * this.direction);

    ctx.drawImage(
      this.image,
      -this.radius / 2,
      -this.radius / 2,
      this.radius,
      this.radius
    );

    ctx.closePath();
    ctx.restore();
  }
}
