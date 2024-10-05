export class Vector {
  constructor(isFixed, x, y, radius) {
    this.isFixed = isFixed;
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.oldX = x;
    this.oldY = y;

    this.vx = 0;
    this.vy = 0;

    this.force = {
      x: 0,
      y: 0,
    };
    this.gravity = {
      x: 0,
      y: 0,
    };
    this.mass = this.radius * 1.3;

    this.damping = 0.4;
    this.isClose = false;
  }

  move(mouse) {
    if (mouse.isDown) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = this.radius * 3;

      if (distance < minDistance) {
        const normalize = {
          x: dx / distance,
          y: dy / distance,
        };
        const force = 10;

        this.x += normalize.x * force;
        this.y += normalize.y * force;
      }
    }
  }

  update(dt) {
    if (!this.isFixed) {
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

  restricts(ctx, point) {
    for (let i = 0; i < point.length - 1; i++) {
      const p1 = point[i];
      const p2 = point[i + 1];

      if (p1.isFixed && p2.isFixed) continue;

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = p1.radius + p2.radius;
      const diff = distance - maxDistance;
      const percent = diff / distance / 2;

      const tx = dx * percent;
      const ty = dy * percent;

      if (!p1.isFixed) {
        p1.x += tx;
        p1.y += ty;
      }

      if (!p2.isFixed) {
        p2.x -= tx;
        p2.y -= ty;
      }
    }
  }

  constraints() {
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
    if (this.isClose) {
      ctx.fillStyle = "#19c";
    } else {
      ctx.fillStyle = "#333";
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
