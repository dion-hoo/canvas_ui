export class Point {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 3 - 1.5;
    this.vy = Math.random() * 3 - 1.5;
    this.radius = radius;
    this.color = color;
    this.isEnd = false;
  }

  update() {
    this.radius -= 0.02;

    if (this.radius < 0) {
      this.radius = 0;
      this.isEnd = true;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = `hsl(${this.color}, 100%, 50%)`;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
