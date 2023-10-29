export class Light {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 1 - 0.5;
    this.vy = -Math.random() * 3 + 1.5;
    this.radius = radius;
    this.color = color;
    this.isTouch = false;
  }

  update(mouse) {
    const dx = this.x - mouse.moveX;
    const dy = this.y - mouse.moveY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius) {
      this.isTouch = true;
    }

    if (this.isTouch) {
      this.vy += 0.1;

      this.x += this.vx;
      this.y += this.vy;

      if (this.x - this.radius < 0 || this.x > innerWidth - this.radius) {
        this.vx *= -0.5;
      }

      if (this.y - this.radius < 0 || this.y > innerHeight - this.radius) {
        this.vy *= -0.5;
        this.y = innerHeight - this.radius;
      }
    }
  }

  draw(ctx) {
    // shadow
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 2;

    // gradient
    const gradient = ctx.createRadialGradient(
      this.x + this.radius * 0.4,
      this.y,
      this.radius * 0.05,
      this.x + this.radius * 0.3,
      this.y,
      this.radius + this.radius * 0.3
    );

    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, this.color);
    ctx.fillStyle = gradient;

    // draw
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
