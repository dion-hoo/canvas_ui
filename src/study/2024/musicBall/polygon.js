export class Polygon {
  constructor(index, x, y, sides, size, polygonAngle) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.sides = sides;
    this.size = size;
    this.polygonAngle = polygonAngle;

    const angle = 360 / this.sides;
    const radian = (angle * Math.PI) / 180;

    this.diagram = [];

    for (let i = 0; i < this.sides; i++) {
      const x = Math.cos(radian * i) * this.size;
      const y = Math.sin(radian * i) * this.size;

      this.diagram.push({ x, y });
    }

    this.rotation();
  }

  rotation() {
    const radian = (this.polygonAngle * Math.PI) / 180;

    for (let i = 0; i < this.diagram.length; i++) {
      const d = this.diagram[i];

      const x = d.x * Math.cos(radian) - d.y * Math.sin(radian);
      const y = d.x * Math.sin(radian) + d.y * Math.cos(radian);

      this.diagram[i].x = x;
      this.diagram[i].y = y;
    }
  }

  update() {
    this.y -= 0.4;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";

    ctx.translate(this.x, this.y);

    ctx.beginPath();
    for (let i = 0; i < this.diagram.length; i++) {
      const diagram = this.diagram[i];

      if (i === 0) {
        ctx.moveTo(diagram.x, diagram.y);
      } else {
        ctx.lineTo(diagram.x, diagram.y);
      }
    }
    ctx.stroke();
    ctx.fill();

    ctx.restore();
  }
}
