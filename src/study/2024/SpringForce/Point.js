export class Point {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.color = color;
    this.isClick = false;
    this.islocked = false;
  }

  mouseUpdate(mouse) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (this.isClick || (distance < this.radius && mouse.isDown)) {
      this.x = mouse.x;
      this.y = mouse.y;

      this.vx = 0;
      this.vy = 0;

      this.isClick = true;
    }
  }

  update(force) {
    if (!this.islocked) {
      this.vx += force.x;
      this.vy += force.y;

      this.x += this.vx;
      this.y += this.vy;

      this.vx *= 0.94;
      this.vy *= 0.94;
    }
  }

  draw(ctx) {
    ctx.fillStyle = `hsl(${this.color}, 60%, 50%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();
  }
}
