export class Triangle {
  constructor(x, y, radius, side, size) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.side = side;
    this.size = size;

    this.arr = [
      { x: this.x, y: this.y },
      { x: this.x + 150, y: this.y + this.radius },
      { x: this.x - 150, y: this.y + this.radius },
    ];
  }

  draw(ctx) {
    ctx.strokeStyle = "blue";
    ctx.beginPath();

    this.arr.forEach((a, index) => {
      if (index === 0) {
        ctx.moveTo(a.x, a.y);
      } else {
        ctx.lineTo(a.x, a.y);
      }
    });
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}
