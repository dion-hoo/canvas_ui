export class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.accelerationX = Math.random() * 0.01 - 0.005;
    this.accelerationY = Math.random() * 0.05 + 0.03;

    this.vx = 0;
    this.vy = 0;
    this.mass = 10;

    this.rotation = Math.random() * (Math.PI * 2);
    this.damping = 0.8;
  }

  update() {
    this.vx += this.accelerationX;
    this.vy += this.accelerationY;

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.radius) {
      this.vx *= -this.damping;
      this.x = this.radius;
    }

    if (this.x > innerWidth - this.radius) {
      this.vx *= -this.damping;
      this.x = innerWidth - this.radius;
    }

    if (this.y < this.radius) {
      this.mass *= -this.damping;
      this.y = this.radius;
    }

    if (this.y > innerHeight - this.radius) {
      this.mass *= -this.damping;
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
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 충돌
      if (distance <= this.radius + circle.radius) {
        const normalize = {
          x: dx / distance,
          y: dy / distance,
        };

        const overlap = this.radius + circle.radius - distance;

        const separation = {
          x: normalize.x * (overlap / 2),
          y: normalize.y * (overlap / 2),
        };
      }
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
