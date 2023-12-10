export class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.mass = this.radius * 0.6;
    this.vx = 0;
    this.vy = 0;
  }

  update(vy, bounce = 1) {
    this.vy += vy;

    this.y += this.vy;

    this.vy *= bounce;
  }

  draw(ctx) {
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
