export class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 30;

    this.f = 5;
    this.degree = -20;
    this.angle = (this.degree * Math.PI) / 180;

    this.vx = Math.cos(this.angle) * this.f;
    this.vy = Math.sin(this.angle) * this.f;
  }

  update() {
    const gravity = 0.1;

    this.vy += gravity;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
