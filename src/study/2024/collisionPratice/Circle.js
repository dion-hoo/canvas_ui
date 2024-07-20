export class Circle {
  constructor(index, x, y, radius, color) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = radius;
    this.color = color;

    this.vx = 0;
    this.vy = 0;
    this.speed = 20;
    this.angle = 10;
    this.friction = 0.5;

    this.repulsive = 0.92;
    this.floor = 0;
    this.isFloored = false;
    this.gravity = 0.1;
  }

  applyForce() {
    const radian = (this.angle * Math.PI) / 180;

    const tx = Math.cos(radian) * this.speed;
    const ty = Math.sin(radian) * this.speed;

    if (this.angle < 15) {
      this.vx += tx;
      this.vy += ty;

      this.vx *= this.friction;
      this.vy *= this.friction;
    }

    this.angle += 0.26;
  }

  update(circle) {
    this.x += this.vx;

    if (this.isFloored) {
      this.y = innerHeight - this.radius;
    } else {
      this.vy += this.gravity;
      this.y += this.vy;
    }

    for (let i = 0; i < circle.length; i++) {
      const target = circle[i];

      if (this === target) {
        continue;
      }

      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const distance = dx * dx + dy * dy;
      const dist = Math.sqrt(distance);
      const minDistance =
        (this.radius + target.radius) * (this.radius + target.radius);

      const overlap = this.radius + target.radius - dist;

      if (distance < minDistance) {
        const normalized = {
          x: dx / dist,
          y: dy / dist,
        };

        // overlap
        const overlapForce = overlap / 2;

        const radian = Math.atan2(dy, dx);

        this.x -= Math.cos(radian) * overlapForce;
        this.y -= Math.sin(radian) * overlapForce;

        target.x += Math.cos(radian) * overlapForce;
        target.y += Math.sin(radian) * overlapForce;

        // 왜 상대 속도를 충돌 반대 방향으로 구하는지?
        const relativeValocity = {
          x: this.vx - target.vy,

          y: this.vy - target.vy,
        };

        // 내적을 구해서 얼마나 힘이 일치하는지 보는거는 알겠는데, 상대 속도의 벡터 방향을 아직 이해 못함
        let speed =
          relativeValocity.x * normalized.x + relativeValocity.y * normalized.y;

        speed *= 0.56;

        if (speed > 0) {
          // 왜 여기서 2를 곱해줘야 하는지? 운동에너지 보존 법칙이라고 알고 있는데 아직 정확히 이해 못함
          const impulse = (speed * 2) / (this.mass + target.mass);

          this.vx -= impulse * target.mass * normalized.x;
          this.vy -= impulse * target.mass * normalized.y;

          target.vx += impulse * this.mass * normalized.x;
          target.vy += impulse * this.mass * normalized.y;

          // 충돌 후 속도를 점점 줄이기 위해서 곱해준다.
          this.vx *= this.repulsive;
          this.vy *= this.repulsive;

          target.vx *= this.repulsive;
          target.vy *= this.repulsive;
        }
      }
    }
  }

  windowCollision() {
    if (this.x < this.radius) {
      this.vx *= -this.repulsive;
      this.x = this.radius;
    }

    if (this.x > innerWidth - this.radius) {
      this.vx *= -this.repulsive;
      this.x = innerWidth - this.radius;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -this.repulsive;
    }

    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;

      if (this.floor > 20) {
        this.vy = 0;

        this.floor = 21;
        this.isFloored = true;
      } else {
        this.vy *= -this.repulsive;
      }

      this.floor++;
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
