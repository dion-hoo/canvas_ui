export class Particle {
  constructor(x, y, normalize) {
    this.x = x;
    this.y = y;
    this.fixedX = x;
    this.fixedY = y;
    this.vx = 0;
    this.vy = 0;

    this.ax = normalize.x * Math.random() * 0.01 + 0.001;
    this.ay = normalize.y * Math.random() * 0.01 + 0.001;

    this.size = Math.random() * 2 + 1;

    this.isLife = true;
    this.angle = 0;
  }

  update(cond) {
    this.vx += this.ax;
    this.vy += this.ay;

    this.x += this.vx;
    this.y += this.vy;

    this.size -= 0.001;

    if (this.size < 0) {
      this.size = 0;
      this.isLife = false;
    }

    if (cond) {
      this.x += this.vx;
      this.y += this.vy;

      this.x += this.vx;
      this.y += this.vy;

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  edges() {
    if (
      this.x < -innerWidth / 2 - this.size ||
      this.x > innerWidth / 2 + this.size ||
      this.y < -innerHeight / 2 - this.size ||
      this.y > innerHeight / 2 + this.size
    ) {
      return true;
    } else {
      return false;
    }
  }

  draw(ctx, color, cond) {
    ctx.save();

    this.angle += cond ? 0.5 : 0.1;
    const angle = (this.angle * Math.PI) / 180;

    ctx.translate(innerWidth * 0.5, innerHeight * 0.5);
    ctx.rotate(angle);

    // ctx.fillStyle = `hsl(${color}, 100%, 50%)`;
    ctx.fillStyle = `#f4fc0d`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
