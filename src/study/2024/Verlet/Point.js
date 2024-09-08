export class Point {
  constructor(x, y, radius, gap, matrix, isLocked, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gap = gap;
    this.matrix = matrix;
    this.isLocked = isLocked;
    this.color = color;

    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.force = {
      x: Math.random() * 0.8 - 0.4,
      y: 0,
    };
    this.mass = this.radius * 1.3;
    this.damping = 0.89;

    this.gravity = {
      x: 0,
      y: 0.04,
    };

    this.mouseminDistance = 40;
  }

  move(mouse) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = dx * dx + dy * dy;
    const dist = Math.sqrt(distance);

    if (dist < this.mouseminDistance && !this.isLocked) {
      const normalized = {
        x: dx / dist,
        y: dy / dist,
      };
      const force = 20;

      this.x += normalized.x * force;
      this.y += normalized.y * force;

      this.oldX = this.x;
      this.oldY = this.y;
    }
  }

  update(dt) {
    if (!this.isLocked) {
      this.vx = this.x - this.oldX;
      this.vy = this.y - this.oldY;

      this.oldX = this.x;
      this.oldY = this.y;

      const ax = this.force.x / this.mass;
      const ay = this.force.y / this.mass;

      this.vx += this.gravity.x;
      this.vy += this.gravity.y;

      this.x += this.vx + ax * dt * dt;
      this.y += this.vy + ay * dt * dt;
    } else {
      this.x = this.oldX;
      this.y = this.oldY;
    }
  }

  getMyAroundIndex(index) {
    return {
      right: index % this.matrix !== this.matrix - 1 ? index + 1 : null,
      down:
        index + this.matrix > this.matrix * this.matrix
          ? null
          : index + this.matrix,
    };
  }

  restrict(ctx, index, pointList) {
    const { right, down } = this.getMyAroundIndex(index);

    const pRight = pointList[right];
    const pDown = pointList[down];

    if (pRight) {
      this.drawRestrict(ctx, pRight);
    }

    if (pDown) {
      this.drawRestrict(ctx, pDown);
    }
  }

  drawRestrict(ctx, p) {
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    const maxCorrection = 5;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // true
    // false
    const isCut = false;

    if (isCut) {
      if (distance < this.mouseminDistance) {
        this.restrictUpdate(ctx, dx, dy, distance, p, maxCorrection);
      }
    } else {
      this.restrictUpdate(ctx, dx, dy, distance, p, maxCorrection);
    }
  }

  restrictUpdate(ctx, dx, dy, distance, p, maxCorrection) {
    if (this.gap < distance) {
      const diff = distance - this.gap;
      let percent = diff / distance / 2;

      percent = Math.min(percent, maxCorrection / distance);

      const tx = dx * percent;
      const ty = dy * percent;

      this.x += tx;
      this.y += ty;

      p.x -= tx;
      p.y -= ty;
    }

    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.closePath();
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

    if (this.y < this.radius) {
      this.y = this.radius;
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
