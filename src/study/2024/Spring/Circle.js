export class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 3;
    this.vy = 0;
    this.radius = 30;
    this.color = "#fff";
    this.gravity = 0.3; // 중력
    this.damping = 0.93; // 감속 계수
    this.targetY = y;
  }

  update(line) {
    if (line.isDetect) {
      this.y = line.point[1].y - this.radius;
    } else {
      if (this.y < this.targetY - this.radius) {
        this.vy += this.gravity;
        this.vy *= this.damping;
        this.y += this.vy;

        // overshoot을 방지하기 위해 방향을 반대로 하고 감속
        if (this.y > this.targetY - this.radius) {
          this.y = this.targetY - this.radius;
          this.vy = 0;
        }
      } else {
        this.vy = 0;
        this.y = this.targetY - this.radius;
      }
    }

    // guard
    if (this.x < this.radius) {
      this.vx *= -1;
      this.x = this.radius;
    }

    if (this.x > innerWidth - this.radius) {
      this.vx *= -1;
      this.x = innerWidth - this.radius;
    }

    if (this.y < this.radius) {
      this.vy *= -1;
      this.y = this.radius;
    }

    if (this.y > innerHeight - this.radius) {
      this.vy = 0;
      this.y = innerHeight - this.radius;
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
