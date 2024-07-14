export class Point {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.color = color;
    this.isClick = false;
  }

  mouseUpdate(mouse) {
    if (mouse.isDown) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (this.isClick || (distance < this.radius && mouse.isDown)) {
        this.x = mouse.x;
        this.y = mouse.y;

        this.vx = 0;
        this.vy = 0;

        this.isClick = true;
      }
    }
  }

  collision(list) {
    for (let i = 0; i < list.length; i++) {
      const target = list[i];

      if (target === this) {
        continue;
      }

      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const min = this.radius + target.radius;

      if (distance < min) {
        const angle = Math.atan2(dy, dx); // 방향
        const x = this.x + Math.cos(angle) * min;
        const y = this.y + Math.sin(angle) * min;

        const ax = (x - target.x) * 0.15;
        const ay = (y - target.y) * 0.15;

        this.vx -= ax;
        this.vy -= ay;

        target.vx += ax;
        target.vy += ay;
      }
    }
  }

  update(force) {
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    }

    if (this.x > innerWidth - this.radius) {
      this.x = innerWidth - this.radius;

      this.vx *= -1;
    }

    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;

      this.vy *= -1;
    }

    if (this.y < this.radius) {
      this.y = this.radius;

      this.vy *= -1;
    }

    this.vx += force.x;
    this.vy += force.y;

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.92;
    this.vy *= 0.92;
  }

  draw(ctx) {
    ctx.fillStyle = `hsl(${this.color}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
