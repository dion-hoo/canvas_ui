export class Point {
  constructor(index, x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.y2 = y;
    this.cur = index;
    this.maxHeight = Math.random() * 5 + 5;
  }

  update(moveY) {
    this.cur += 0.05 + moveY;
    this.y = this.y2 + Math.sin(this.cur) * this.maxHeight;
  }

  draw(ctx) {
    ctx.fillStyle = "#39d665";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
