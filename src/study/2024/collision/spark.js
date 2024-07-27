export class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;

    const sides = 10;
    const angle = 360 / sides;
    const radian = (angle * Math.PI) / 180;

    this.point = [];

    for (let i = 0; i < sides; i++) {
      const x = this.x + Math.cos(radian * i);
      const y = this.y + Math.sin(radian * i);
      const length = radian * i;

      this.point.push({
        x,
        y,
        length,
      });
    }

    this.vx = 1;
    this.vy = 1;
    this.speed = 4;
    this.isEnd = false;
  }

  update() {
    this.point.forEach((p) => {
      p.x = this.x + Math.cos(p.length) * this.vx;
      p.y = this.y + Math.sin(p.length) * this.vy;
    });

    this.vx += this.speed;
    this.vy += this.speed;

    if (this.radius < 1) {
      this.radius = 0;
      this.isEnd = true;
    } else {
      this.radius -= this.speed / 10;
    }
  }

  draw(ctx) {
    ctx.save();

    ctx.shadowColor = "#c74b3f";
    ctx.shadowBlur = 20;

    ctx.fillStyle = "#c74b3f";

    this.point.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.closePath();
    ctx.restore();
  }
}
