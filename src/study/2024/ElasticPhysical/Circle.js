export class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.force = {
      x: 0,
      y: 1.4,
    };
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.mass = this.radius * 1.2;

    this.damping = 0.3;
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

  collision(circle) {
    for (let i = 0; i < circle.length; i++) {
      const c = circle[i];

      if (c === this) {
        continue;
      }

      const dx = c.x - this.x;
      const dy = c.y - this.y;
      const distance = dx * dx + dy * dy;
      const dist = Math.sqrt(distance);
      const minDistance = (this.radius + c.radius) * (this.radius + c.radius);

      if (distance <= minDistance) {
        const overlap = this.radius + c.radius - dist;
        const force = overlap / 2;
        const nomarlized = {
          x: dx / dist,
          y: dy / dist,
        };

        this.x -= force * nomarlized.x;
        this.y -= force * nomarlized.y;

        c.x += force * nomarlized.x;
        c.y += force * nomarlized.y;
      }
    }
  }

  constraint() {
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
