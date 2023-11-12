export class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = 100;
    this.count = 10;
    this.line = [];
  }

  draw(ctx) {
    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);

    for (let i = 0; i <= this.sides; i += this.count) {
      const angle = (Math.PI * 2 * i) / this.sides;
      const x = this.x + this.radius * Math.cos(angle);
      const y = this.y + this.radius * Math.sin(angle);

      ctx.lineTo(x, y);

      this.line.push({
        x,
        y,
      });
    }
    ctx.closePath();
    ctx.stroke();
  }
}
