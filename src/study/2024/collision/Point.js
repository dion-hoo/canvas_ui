export class Point {
  constructor(x, y, radius, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.color = color;
    this.originColor = color;

    this.force = {
      x: 0,
      y: speedY,
    };
    this.mass = this.radius * 1.3;
    this.damping = 0.4;
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

  traversing(point, callback) {
    for (let i = 0; i < point.length; i++) {
      const p = point[i];

      if (this === p) {
        continue;
      }

      const dx = p.x - this.x;
      const dy = p.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = this.radius + p.radius;
      const normalize = {
        x: dx / dist,
        y: dy / dist,
      };

      if (dist < minDist) {
        p.color = "#fff";

        callback({
          p,
          dx,
          dy,
          dist,
          minDist,
          normalize,
        });
      }
    }
  }

  overlap(point) {
    this.traversing(point, ({ dist, minDist, normalize }) => {
      const overlap = minDist - dist;
      const force = overlap / 2;

      this.x -= normalize.x * force;
      this.y -= normalize.y * force;
    });
  }

  reflection(point) {
    this.traversing(point, ({ minDist, dist, normalize }) => {
      const dot = this.vx * normalize.x + this.vy * normalize.y;

      this.vx += 2 * -dot * normalize.x;
      this.vy += 2 * -dot * normalize.y;

      this.oldX = this.x - this.vx * this.damping;
      this.oldY = this.y - this.vy * this.damping;

      const overlap = minDist - dist;
      const force = overlap / 2;

      this.x -= normalize.x * force;
      this.y -= normalize.y * force;
    });
  }

  constraints(point) {
    this.traversing(point, ({ p, dx, dy, dist, minDist, normalize }) => {
      const diff = dist - minDist;
      const percent = diff / dist / 2;

      const tx = dx * percent;
      const ty = dy * percent;

      this.x += tx;
      this.y += ty;
    });
  }

  conservationEnergy(point) {
    this.traversing(point, () => {});
  }

  windowBounce() {
    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;

      this.oldY = this.y + this.vy * this.damping;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
