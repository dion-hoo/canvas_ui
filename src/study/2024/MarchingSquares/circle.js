export class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.force = {
      x: Math.random() * 0.5 - 0.25,
      y: Math.random() * 0.5 - 0.25,
    };

    this.radius = radius;
    this.mass = this.radius * 1.3;

    this.dx = Math.random() * 2 - 1;
    this.dy = Math.random() * 2 - 1;
  }

  update(dt) {
    // this.vx = this.x - this.oldX;
    // this.vy = this.y - this.oldY;

    // this.oldX = this.x;
    // this.oldY = this.y;

    // const ax = this.force.x / this.mass;
    // const ay = this.force.y / this.mass;

    // this.x += this.vx + ax * dt * dt;
    // this.y += this.vy + ay * dt * dt;

    this.x += this.dx;
    this.y += this.dy;

    if (this.x < this.radius) {
      this.x = this.radius;
      this.oldX = this.x + this.vx;

      this.dx *= -1;
    }

    if (this.x > innerWidth - this.radius) {
      this.x = innerWidth - this.radius;
      this.oldX = this.x + this.vx;

      this.dx *= -1;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.oldY = this.y + this.vy;

      this.dy *= -1;
    }

    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;
      this.oldY = this.y + this.vy;

      this.dy *= -1;
    }
  }

  collision(point) {
    for (let i = 0; i < point.length; i++) {
      const p = point[i];

      if (this === p) {
        continue;
      }

      const dx = this.x - p.x;
      const dy = this.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = this.radius + p.radius;

      if (dist < minDist) {
        const normalize = {
          x: dx / dist,
          y: dy / dist,
        };

        const dot = this.vx * normalize.x + this.vy * normalize.y;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    ctx.closePath();
  }
}
