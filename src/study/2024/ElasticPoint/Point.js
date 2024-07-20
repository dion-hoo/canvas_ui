const force = {
  x: 0,
  y: 3,
};

export class Point {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.radius = radius;
    this.mass = 10;
  }

  update(dt) {
    let vx = this.x - this.oldX;
    let vy = this.y - this.oldY;

    this.oldX = this.x;
    this.oldY = this.y;

    const ax = force.x / this.mass;
    const ay = force.y / this.mass;

    this.x += vx + ax * dt * dt;
    this.y += vy + ay * dt * dt;

    if (this.x < this.radius) {
      this.x = this.radius;
      this.oldX = this.x + vx;
    }

    if (this.x > innerWidth - this.radius) {
      this.x = innerWidth - this.radius;
      this.oldX = this.x + vx;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.oldY = this.y + vy;
    }

    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;
      this.oldY = this.y + vy;
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
