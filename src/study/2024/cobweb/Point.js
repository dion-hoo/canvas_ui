export class Point {
  constructor(x, y, radius, curve) {
    this.x = x;
    this.y = y;
    this.fixedX = this.x;
    this.fixedY = this.y;
    this.radius = radius;
    this.curve = curve;

    this.oldX = this.x;
    this.oldY = this.y;
    this.vx = 0;
    this.vy = 0;

    this.force = {
      x: 0,
      y: 0,
    };
    this.mass = this.radius * 1.3;
  }

  update(dt) {
    this.vx = this.x - this.oldX;
    this.vy = this.y - this.oldY;

    this.oldX = this.x;
    this.oldY = this.y;

    const ax = this.force.x / this.mass;
    const ay = this.force.y / this.mass;

    this.x += this.vx + ax * dt * dt;
    this.y += this.vy + ay * dt * dt;
  }

  move(x, y, mouse) {
    const dx = mouse.x - (x + this.x);
    const dy = mouse.y - (y + this.y);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const normarlize = {
      x: dx / distance,
      y: dy / distance,
    };
    const radius = 20;

    if (distance < radius && mouse.isDown) {
      this.x += normarlize.x * 2;
      this.y += normarlize.y * 2;
    } else {
      this.oldX = this.x;
      this.oldY = this.y;
    }
  }

  restrict(p2, dist) {
    const dx = p2.x - this.x;
    const dy = p2.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const diff = distance - dist;
    let percent = diff / distance / 2;

    percent = Math.min(percent, 0.001);

    const tx = dx * percent;
    const ty = dy * percent;

    this.x += tx;
    this.y += ty;

    p2.x -= tx;
    p2.y -= ty;
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
