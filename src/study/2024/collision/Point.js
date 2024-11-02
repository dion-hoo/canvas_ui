export class Point {
  constructor(i, x, y, radius, minWidth, maxWidth, isEuler) {
    this.index = i;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.color = "#fff";

    this.isEuler = isEuler;

    this.minWidth = minWidth;
    this.maxWidth = maxWidth;

    this.force = {
      x: 0,
      y: i === 0 ? Math.random() * 1 - 0.5 : 0,
    };
    this.mass = this.radius * 1.3;

    this.gravity = {
      x: 0,
      y: isEuler ? 0.6 : 0.1,
    };

    this.damping = 0.92;
    this.kin = 0;
    this.kinA = 0;
    this.kinB = 0;
  }

  update(dt) {
    if (this.isEuler) {
      this.vx += this.gravity.x;
      this.vy += this.gravity.y;

      this.x += this.vx;
      this.y += this.vy;

      this.vx *= this.damping;
      this.vy *= this.damping;
    } else {
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
        p.color = "#232323";

        this.force.x = 0;
        this.force.y = 0;

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

      this.oldX = this.x - this.vx * 0.4;
      this.oldY = this.y - this.vy * 0.4;

      const overlap = minDist - dist;
      const force = overlap / 2;

      this.x -= normalize.x * force;
      this.y -= normalize.y * force;
    });
  }

  constraints(point) {
    this.traversing(point, ({ dx, dy, dist, minDist }) => {
      const diff = dist - minDist;
      const percent = diff / dist / 2;

      const tx = dx * percent;
      const ty = dy * percent;

      this.x += tx;
      this.y += ty;
    });
  }

  conservationEnergy(point) {
    this.traversing(point, ({ p, dx, dy, minDist, dist, normalize }) => {
      const diff = minDist - dist;
      const force = diff / 2;

      this.x -= force * normalize.x;
      this.y -= force * normalize.y;

      p.x += force * normalize.x;
      p.y += force * normalize.y;

      const totalMass = this.mass + p.mass;
      const diffV = {
        x: p.vx - this.vx,
        y: p.vy - this.vy,
      };

      const dot = diffV.x * dx + diffV.y * dy;
      const num = 2 * p.mass * dot;
      const den = totalMass * dist * dist;

      const deltaA = {
        x: (num / den) * dx,
        y: (num / den) * dy,
      };

      const deltaB = {
        x: (-num / den) * dx,
        y: (-num / den) * dy,
      };

      this.vx += deltaA.x;
      this.vy += deltaA.y;

      p.vx += deltaB.x;
      p.vy += deltaB.y;

      const speedA = this.vx * this.vx + this.vy * this.vy;
      const speedB = p.vx * p.vx + p.vy * p.vy;

      this.kinA = 0.5 * this.mass * speedA;
      this.kinB = 0.5 * this.mass * speedB;

      this.kin = this.kinA + this.kinB;
    });
  }

  edges() {
    if (this.x < this.minWidth + this.radius) {
      this.x = this.minWidth + this.radius;

      if (this.isEuler) {
        this.vx *= -1;
      } else {
        this.oldX = this.x + this.vx;
      }
    }

    if (this.x > this.maxWidth - this.radius) {
      this.x = this.maxWidth - this.radius;

      if (this.isEuler) {
        this.vx *= -1;
      } else {
        this.oldX = this.x + this.vx;
      }
    }

    if (this.y < innerHeight * 0.4) {
      this.y = innerHeight * 0.4;

      if (this.isEuler) {
        this.vy *= -1;
      } else {
        this.oldY = this.y + this.vy;
      }
    }

    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;

      if (this.isEuler) {
        this.vy *= -1;
      } else {
        this.oldY = this.y + this.vy;
      }
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
