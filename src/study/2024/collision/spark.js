export class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
