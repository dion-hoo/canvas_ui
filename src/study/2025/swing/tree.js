export class Tree {
  constructor(x, y, branch) {
    this.x = x;
    this.y = y;
    this.branch = branch;

    this.t = 0;
    this.angle = Math.random() * Math.PI + Math.PI;
  }

  lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
  }

  draw(ctx) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.beginPath();

    if (this.t < 1) {
      this.t += 0.01;
    } else {
      this.t = 1;
    }

    const len = this.lerp(0, 300, this.t);
    const x = this.x + Math.cos(this.angle) * len;
    const y = this.y + Math.sin(this.angle) * len;

    const cx = (this.x + x) / 2;
    const cy = (this.y + y) / 2;

    ctx.moveTo(this.x, this.y);
    ctx.quadraticCurveTo(cx, cy, x, y);
    ctx.stroke();
  }
}
