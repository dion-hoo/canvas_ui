import { getDistance2 } from "./util.js";

export class Point {
  constructor(
    isFixed,
    x,
    y,
    radius,
    color = "#000",
    gravity = { x: 0, y: 0.4 }
  ) {
    this.isFixed = isFixed;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.radius = radius;
    this.color = color;

    this.vx = 0;
    this.vy = 0;
    this.force = {
      x: 0,
      y: 0,
    };
    this.gravity = gravity;
    this.mass = this.radius * 1.3;
    this.damping = 0.47;

    this.floorCount = 0;
    this.maxFloorCount = 7;
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

  move(mouse, gap, force) {
    const { dx, dy, distance } = getDistance2(mouse.x, mouse.y, this.x, this.y);

    if (distance < gap) {
      const normal = {
        x: dx / distance,
        y: dy / distance,
      };

      if (!this.isFixed) {
        this.x += force * normal.x;
        this.y += force * normal.y;
      }
    }
  }

  constraints(ctx, target, gap, strokeColor, isDraw = true) {
    const { dx, dy, distance } = getDistance2(
      this.x,
      this.y,
      target.x,
      target.y
    );

    const diff = distance - gap;
    const percent = diff / distance / 2;

    const tx = percent * dx;
    const ty = percent * dy;

    if (distance > gap) {
      if (!this.isFixed) {
        this.x += tx;
        this.y += ty;
      }

      if (!target.isFixed) {
        target.x -= tx;
        target.y -= ty;
      }
    }

    if (isDraw) {
      ctx.strokeStyle = strokeColor;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    }
  }

  windowRebound() {
    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;

      this.oldY = this.y + this.vy * this.damping;

      if (this.floorCount > this.maxFloorCount) {
        this.isEnd = true;
      }

      this.floorCount++;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
