export class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = 0.5;

    this.vx = 0;
    this.vy = 0;
    this.damping = 0.92;
  }

  applyForce(force) {
    this.vx += force.x;
    this.vy += force.y;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  detectWindow() {
    if (this.x < this.radius) {
      this.vx = Math.abs(this.vx) * this.damping;
      this.x = this.radius;
    } else if (this.x > innerWidth - this.radius) {
      this.vx = Math.abs(this.vx) * -this.damping;
      this.x = innerWidth - this.radius;
    }

    if (this.y < this.radius) {
      this.vy = Math.abs(this.vy) * this.damping;
      this.y = this.radius;
    } else if (this.y > innerHeight - this.radius) {
      this.vy = Math.abs(this.vy) * -this.damping;
      this.y = innerHeight - this.radius;
    }
  }

  collision(object) {
    for (let i = 0; i < object.length; i++) {
      const circle = object[i];

      if (this === circle) {
        continue;
      }

      const dx = circle.x - this.x;
      const dy = circle.y - this.y;
      const distance = dx * dx + dy * dy;
      const threshold =
        (this.radius + circle.radius) * (this.radius + circle.radius);

      if (distance < threshold) {
        // 충돌 할 방향 구하기
        const normalized = {
          x: dx / Math.sqrt(distance),
          y: dy / Math.sqrt(distance),
        };

        // 충돌 할 속도 구하기
        // 충돌 속도에 현재 물체의 속도가 어떻게 영향이 받는지 보려면 충돌 방향과 반대 방향을 구한다.
        const relativeVelocity = {
          x: this.vx - circle.vx,
          y: this.vy - circle.vy,
        };
        let speed =
          relativeVelocity.x * normalized.x + relativeVelocity.y * normalized.y;

        speed *= Math.min(this.damping, circle.damping);

        if (speed < 0) {
          continue;
        }

        const impulse = (speed * 1.2) / (this.mass + circle.mass);

        this.vx -= impulse * circle.mass * normalized.x;
        this.vy -= impulse * circle.mass * normalized.y;
        circle.vx += impulse * this.mass * normalized.x;
        circle.vy += impulse * this.mass * normalized.y;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = `hsl(${this.color}, 100%, 50%)`;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
