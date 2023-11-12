export class StackSnow {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.point = [];
    this.isOnce = false;

    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 15 - 5;
      const y = Math.random() * -2.5;

      this.point.push({
        x: this.x + x,
        y: this.y + y,
      });
    }
  }

  update(x, y) {
    this.x = x;
    this.y = y;

    // if (this.isOnce) {
    //   for (let i = 0; i < this.point.length; i++) {
    //     this.point[i].x += this.x;
    //     this.point[i].y += this.y;
    //   }
    // }
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowColor = "blue";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = -2;

    ctx.fillStyle = "blue";
    ctx.beginPath();
    this.point.forEach((p) => {
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    });

    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
