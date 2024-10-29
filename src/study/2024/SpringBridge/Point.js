export class Point {
  constructor(index, x, y, radius) {
    this.index = index;
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
      y: Math.random() * 0.09 + 0.05,
    };
    this.mass = this.radius * 1.3;

    this.damping = 0.3;
  }

  update(dt) {
    this.vx = this.x - this.oldX;
    this.vy = this.y - this.oldY;

    this.oldX = this.x;
    this.oldY = this.y;

    const ax = this.force.x / this.mass;
    const ay = this.force.y / this.mass;

    this.x += this.vx + ax * dt * dt + this.gravity.x;
    this.y += this.vy + ay * dt * dt + this.gravity.y;
  }

  move(mouse) {
    if (mouse.isDown) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const normal = {
        x: dx / dist,
        y: dy / dist,
      };

      const force = 7 / dist;
      const direction = mouse.isUp <= 0 ? 1 : -1;

      this.x += normal.x * force * direction;
    }
  }

  lineCollsion(point) {
    for (let i = 0; i < point.length; i++) {
      const p = point[i];

      const dx = this.x - p.x;
      const dy = this.y - p.y;
      const distance = dx * dx + dy * dy;
      const dist = Math.sqrt(distance);
      const minDistance = this.radius + p.radius;
      const normal = {
        x: dx / dist,
        y: dy / dist,
      };

      if (dist < minDistance) {
        const dot = this.vx * normal.x + this.vy * normal.y;

        this.oldX = this.x + this.vx;
        this.y = p.y - p.radius - this.radius;

        this.vy = this.vy + 2 * -dot * normal.y;
        this.oldY = this.y + this.vy;

        this.vy = 0;
        this.oldY = this.y;

        p.isClose = true;
        p.gravity.y = this.mass / 20;

        // const cx = innerWidth * 0.5 - this.x;
        // const cy = innerHeight * 0.6 - this.y;
        // const cDist = Math.sqrt(cx * cx + cy * cy);
        // const cNormal = {
        //   x: cx / cDist,
        //   y: cy / cDist,
        // };
        // const f = 0.03;

        // this.x += cNormal.x * f;
        // this.y += cNormal.y * f;
      }
    }
  }

  collision(point) {
    for (let i = 0; i < point.length - 1; i++) {
      const p = point[i];

      if (this === p) {
        continue;
      }

      const dx = p.x - this.x;
      const dy = p.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDistance = this.radius + p.radius;

      if (dist < minDistance) {
        const normal = {
          x: dx / dist,
          y: dy / dist,
        };
        const overlap = minDistance - dist;
        const force = overlap / 2;

        this.x -= normal.x * force;
        this.y -= normal.y * force;

        p.x += normal.x * force;
        p.y += normal.y * force;

        this.vx = 0;
        this.vy = 0;

        p.vx = 0;
        p.vy = 0;
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
    ctx.fillStyle = "#fff";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
