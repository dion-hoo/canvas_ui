import { checkPoint } from "./CheckPoint.js";

export class Point {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;

    this.force = {
      x: 0,
      y: 2,
    };
    this.mass = this.radius * 1.3;

    this.isIntersection = false;
  }

  update(dt) {
    this.vx = this.x - this.oldX;
    this.vy = this.y - this.oldY;

    this.oldX = this.x;
    this.oldY = this.y;

    const ax = this.force.x / this.mass;
    const ay = this.force.y / this.mass;

    if (!this.isIntersection) {
      this.x += this.vx + ax * dt * dt;
      this.y += this.vy + ay * dt * dt;
    }
  }

  rotation(polygon) {
    const cx = polygon.x;
    const cy = polygon.y;

    const dx = this.x - cx;
    const dy = this.y - cy;

    const radian = polygon.polygonRadian;

    const rotateX = dx * Math.cos(radian) - dy * Math.sin(radian);
    const rotateY = dy * Math.cos(radian) + dx * Math.sin(radian);

    this.x = cx + rotateX;
    this.y = cy + rotateY;
  }

  constraints() {
    if (this.x < this.radius) {
      this.x = this.radius;
      this.oldX = this.x + this.vx * 0.8;
    }

    if (this.x > innerWidth - this.radius) {
      this.x = innerWidth - this.radius;
      this.oldX = this.x + this.vx * 0.8;
    }

    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;
      this.oldY = this.y + this.vy * 0.8;
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
