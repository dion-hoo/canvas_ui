export class Point {
  constructor(index, x, y, radius, isLock) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.isLock = isLock;

    this.radius = radius;
    this.mass = this.radius * 1.3;

    this.force = {
      x: 0,
      y: 0,
    };
    this.gravity = {
      x: 0,
      y: 0.1,
    };

    this.damping = 0.4;
  }

  update(dt) {
    if (!this.isLock) {
      this.vx = this.x - this.oldX;
      this.vy = this.y - this.oldY;

      this.oldX = this.x;
      this.oldY = this.y;

      const ax = this.force.x / this.mass;
      const ay = this.force.y / this.mass;

      this.x += this.vx + ax * dt * dt + this.gravity.x;
      this.y += this.vy + ay * dt * dt + this.gravity.y;
    }
  }

  updatePosition(mouse) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = 100;

    if (dist < minDist && !this.isLock) {
      const angle = Math.atan2(dy, dx);
      const force = 2;

      this.x += Math.cos(angle) * force;
      this.y += Math.sin(angle) * force;
    }
  }

  constraints(ctx, point) {
    ctx.strokeStyle = "#fff";

    for (let i = 0, j = 1; i < point.length; j = i++) {
      const p1 = point[i];
      const p2 = point[j];

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = (p1.radius + p2.radius) * 10;

      const diff = dist - minDist;
      const percent = diff / dist / 2;

      const tx = percent * dx;
      const ty = percent * dy;

      if (!p1.isLock) {
        p1.x += tx;
        p1.y += ty;
      }

      if (!p2.isLock) {
        p2.x -= tx;
        p2.y -= ty;
      }

      ctx.stroke();
      ctx.closePath();
    }
  }

  edge() {
    if (this.x < this.radius) {
      this.x = this.radius;

      this.oldX = this.x + this.vx * this.damping;
    }

    if (this.x > innerWidth - this.radius) {
      this.x = innerWidth - this.radius;

      this.oldX = this.x + this.vx * this.damping;
    }

    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;

      this.oldY = this.y + this.vy * this.damping;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
