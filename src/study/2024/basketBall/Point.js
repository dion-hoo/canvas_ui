export class Point {
  constructor(isFixed, x, y, radius, color) {
    this.isFixed = isFixed;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.radius = radius;
    this.originalRadius = radius;
    this.color = color;

    this.vx = 0;
    this.vy = 0;
    this.force = {
      x: 0,
      y: 0,
    };
    this.gravity = {
      x: 0,
      y: 0.4,
    };
    this.mass = this.radius * 1.3;
    this.damping = 0.34;

    this.isDown = false;

    this.isEnd = false;
    this.shootForce = 0.6;
    this.isOnceDistance = false;

    this.dist = 0;
    this.dx = 0;
    this.dy = 0;
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

  reset() {
    this.isDown = false;
    this.isEnd = false;
    this.isOnceDistance = false;

    // this.x = innerWidth * 0.5 - 30 / 2;
    // this.y = innerHeight - 90;

    // this.oldX = this.x;
    // this.oldY = this.y;

    this.dist = 0;
    this.dx = 0;
    this.dy = 0;
  }

  move(mouse, gap) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < gap) {
      const normal = {
        x: dx / dist,
        y: dy / dist,
      };
      const force = 10;

      if (!this.isFixed) {
        this.x += force * normal.x;
        this.y += force * normal.y;
      }
    }
  }

  resist(ball) {
    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < this.radius + ball.radius) {
      ball.y -= 0.04;
    }
  }

  shooting(target) {
    if (!this.isOnceDistance) {
      this.dx = target.x - this.x;
      this.dy = target.y - this.y;

      this.dist = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
      this.isOnceDistance = true;
    }

    const radian = Math.atan2(this.dy, this.dx);

    const minRadius = this.originalRadius / 1.6;
    const maxRadius = this.originalRadius;
    const referenceY = innerHeight - this.radius;

    this.radius =
      maxRadius - (maxRadius - minRadius) * (1 - this.y / referenceY);

    if (!this.isDown && target.y < this.y) {
      this.x += Math.cos(radian) * this.shootForce;
      this.y += Math.sin(radian) * this.shootForce;
    } else {
      this.isDown = true;
    }

    const diff = Math.abs(innerHeight - this.radius - this.y);

    if (diff < 0.1) {
      this.isEnd = true;
    }
  }

  constraints(ctx, target, gap) {
    const dx = target.x - this.x;
    const dy = target.y - this.y;

    const dist = Math.sqrt(dx * dx + dy * dy);
    const diff = dist - gap;
    const percent = diff / dist / 2;

    const tx = percent * dx;
    const ty = percent * dy;

    if (!this.isFixed) {
      this.x += tx;
      this.y += ty;
    }

    if (!target.isFixed) {
      target.x -= tx;
      target.y -= ty;
    }

    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
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
  }
}
