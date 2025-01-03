export class Ball {
  constructor(x, y, radius, color, isFill) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isFill = isFill;

    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.force = {
      x: 0,
      y: 0,
    };
    this.mass = this.radius * 1.3;
    this.gravity = {
      x: 0,
      y: 0.3,
    };

    this.damping = 0.4;
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

  projection(d1, d2) {
    const v1 = {
      x: this.x - d1.x,
      y: this.y - d1.y,
    };

    const v2 = {
      x: d2.x - d1.x,
      y: d2.y - d1.y,
    };

    const dot = v1.x * v2.x + v1.y * v2.y;
    const mag = v2.x * v2.x + v2.y * v2.y;
    const scale = Math.max(0, Math.min(1, dot / mag));

    const proj = {
      x: d1.x + scale * v2.x,
      y: d1.y + scale * v2.y,
    };

    return {
      x: proj.x,
      y: proj.y,
    };
  }

  collision(polygon, index) {
    const diagram = polygon.diagram;

    for (let i = 0, j = diagram.length - 1; i < diagram.length; j = i++) {
      const p1 = {
        x: polygon.x + diagram[i].x,
        y: polygon.y + diagram[i].y,
      };
      const p2 = {
        x: polygon.x + diagram[j].x,
        y: polygon.y + diagram[j].y,
      };

      const { x, y } = this.projection(p1, p2);

      const dx = this.x - x;
      const dy = this.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const normal = {
        x: dx / dist,
        y: dy / dist,
      };

      if (dist < this.radius - 2) {
        this.reaction(x, y, normal);

        polygon.color = `#323232`;
      }
    }
  }

  constraints(point) {
    for (let i = 0; i < point.length; i++) {
      const p = point[i];

      if (this === p) {
        continue;
      }

      const dx = p.x - this.x;
      const dy = p.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = this.radius + p.radius;

      if (dist < minDist) {
        const diff = dist - minDist;
        const percent = diff / dist / 2;

        const tx = percent * dx;
        const ty = percent * dy;

        this.x += tx;
        this.y += ty;

        p.color = `hsl(${20 * i}, 100%, 50%)`;
      }
    }
  }

  reaction(x, y, normal) {
    const offset = {
      x: normal.x * this.radius,
      y: normal.y * this.radius,
    };

    const dot = this.vx * normal.x + this.vy * normal.y; // 크기

    this.vx = this.vx - 2 * dot * normal.x;
    this.vy = this.vy - 2 * dot * normal.y;

    const dampingVelocity = 0.6;
    this.vx *= dampingVelocity;
    this.vy *= dampingVelocity;

    this.x = x + offset.x;
    this.y = y + offset.y;

    this.oldX = this.x - this.vx;
    this.oldY = this.y - this.vy;
  }

  edges(width, height) {
    if (this.x < this.radius) {
      this.x = this.radius;

      this.oldX = this.x + this.vx * this.damping;
    }

    if (this.x > width - this.radius) {
      this.x = width - this.radius;

      this.oldX = this.x + this.vx * this.damping;
    }

    if (this.y < this.radius) {
      this.y = this.radius;

      this.oldY = this.y + this.vy * this.damping;
    }

    if (this.y > height - this.radius) {
      this.y = height - this.radius;

      this.oldY = this.y + this.vy * this.damping;
    }
  }

  draw(ctx) {
    if (this.isFill) {
      ctx.fillStyle = this.color;
    } else {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    if (this.isFill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }
}
