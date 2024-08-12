export class Point {
  constructor(x, y, radius, colors, lineY) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.force = {
      x: Math.random() * 2 - 1,
      y: 5,
    };
    this.radius = radius;
    this.mass = this.radius * 2;
    this.colors = colors;

    this.damping = 0.4;

    this.lineY = lineY;
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

  findLineIndices(lines) {
    let startIndex = 0;
    let endIndex = 1;

    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].x <= this.x && this.x <= lines[i + 1].x) {
        startIndex = i;
        endIndex = i + 1;
        break;
      }
    }

    return { startIndex, endIndex };
  }

  lineConstraints(lines) {
    if (this.y > this.lineY - this.radius) {
      const { startIndex, endIndex } = this.findLineIndices(lines);

      let gap = lines[0].width;
      let startX = lines[startIndex].x;
      let endX = lines[endIndex].x;

      this.getCloseOnLine(startX, endX, gap);
    }
  }

  isLineCollision(x) {
    const dx = this.x - x;
    const dy = this.y - this.lineY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radian = Math.atan2(dy, dx);

    return {
      isCollision: distance <= this.radius,
      radian,
    };
  }

  getCloseOnLine(start, end, gap) {
    const bounceForce = 3;
    if (this.x < start + this.radius + gap) {
      const { isCollision, radian } = this.isLineCollision(start + gap);

      if (isCollision) {
        this.x += Math.cos(radian) * bounceForce;
        this.y += Math.sin(radian) * bounceForce;
      } else {
        if (this.y > this.lineY) {
          this.x = start + this.radius + gap;
          this.oldX = this.x + this.vx * 0.4;
        }
      }
    }

    if (this.x > end - this.radius) {
      const { isCollision, radian } = this.isLineCollision(end);

      if (isCollision) {
        this.x += Math.cos(radian) * bounceForce;
        this.y += Math.sin(radian) * bounceForce;
      } else {
        if (this.y > this.lineY) {
          this.x = end - this.radius;
          this.oldX = this.x + this.vx * 0.4;
        }
      }
    }
  }

  collision(points, isMove, power) {
    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      if (this === p) {
        continue;
      }

      const dx = p.x - this.x;
      const dy = p.y - this.y;
      const distance = dx * dx + dy * dy;
      const dist = Math.sqrt(distance);
      const minDistance = (this.radius + p.radius) * (this.radius + p.radius);

      if (distance < minDistance) {
        const overlap = this.radius + p.radius - dist;
        const force = power ?? overlap / 2;
        const radian = Math.atan2(dy, dx);

        this.x -= Math.cos(radian) * force;
        this.y -= Math.sin(radian) * force;

        if (isMove) {
          p.x += Math.cos(radian) * force;
          p.y += Math.sin(radian) * force;
        }
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
    ctx.fillStyle = this.colors;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
