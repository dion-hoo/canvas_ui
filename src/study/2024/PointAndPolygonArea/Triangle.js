export class Triangle {
  constructor(x, y, side, size) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.size = size;

    this.arr = [];

    const angle = 360 / this.side;
    const radian = (angle * Math.PI) / 180;

    for (let i = 0; i <= this.side; i++) {
      const x = this.x + Math.cos(radian * i) * this.size;
      const y = this.y + Math.sin(radian * i) * this.size;

      this.arr.push({ x, y });
    }
  }

  draw(ctx) {
    ctx.fillStyl = "orange";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "blue";
    ctx.beginPath();

    this.arr.forEach((a, index) => {
      if (index === 0) {
        ctx.moveTo(a.x, a.y);
      } else {
        ctx.lineTo(a.x, a.y);
      }
    });
    ctx.stroke();
  }
}
