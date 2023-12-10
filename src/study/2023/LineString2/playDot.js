export class PlayDot {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.radius = 15;

    this.force = 10;
    this.degree = -30;
    this.agree = (this.degree * Math.PI) / 180;

    this.vx = Math.cos(this.agree) * this.force * 0.1;
    this.vy = Math.sin(this.agree) * this.force;
    this.vvy = 0;
  }

  update(mouse, borderSpring, isStop, playListIndex) {
    const index = playListIndex;

    if (isStop) {
      this.vvy += 0.1;

      this.y += this.vvy;
    }

    if (mouse.isClick) {
      const gravity = 0.1;

      this.vvy = 0;

      this.vy += gravity;

      this.x += this.vx;
      this.y += this.vy;
    }

    // if (this.x > borderSpring[index].point[0].x) {
    //   this.x = borderSpring[index].point[0].x;
    // }

    if (this.y > borderSpring[index].point[0].y - this.radius) {
      this.vvy *= -0.5;
      this.vy *= -0.6;

      this.y = borderSpring[index].point[0].y - this.radius;

      if (this.vy < 0) {
        this.vy = Math.sin(this.agree) * this.force;
      }
    }
  }

  draw(ctx) {
    ctx.save();

    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 15;

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
}
