export class Eyes {
  constructor(isFixed, x, y, radius) {
    this.isFixed = isFixed;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.force = {
      x: Math.random() * 0.1 - 0.05,
      y: 0.1,
    };
    this.mass = this.radius * 1.3;

    this.gravity = {
      x: 0,
      y: 0.1,
    };

    this.image = new Image();
    this.image.src = "./eyes.png";
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

  move(mouse) {
    if (!this.isFixed) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.radius * 2) {
        const normal = {
          x: dx / dist,
          y: dy / dist,
        };
        const force = 1;

        this.x += normal.x * force;
        this.y += normal.y * force;
      }
    }
  }

  constraints(pumkin) {
    for (let i = 0; i < pumkin.length - 1; i++) {
      const p1 = pumkin[i];
      const p2 = pumkin[i + 1];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = p1.radius + p2.radius;
      const diff = distance - maxDistance;
      const percent = diff / distance / 2;

      const tx = dx * percent;
      const ty = dy * percent;

      if (!p1.isFixed) {
        p1.x += tx;
        p1.y += ty;
      }

      if (!p2.isFixed) {
        p2.x -= tx;
        p2.y -= ty;
      }
    }
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.drawImage(
      this.image,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    ctx.closePath();

    ctx.restore();
  }
}
