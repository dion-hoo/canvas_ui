export class GuideLine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentY = innerHeight;
  }

  update(mouse) {
    this.x = mouse.x || innerWidth * 0.5;
  }

  draw(ctx) {
    if (this.currentY > this.y) {
      this.currentY -= 5;
    }

    ctx.strokeStyle = "#c74b3f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.currentY);
    ctx.lineTo(this.x, innerHeight);
    ctx.stroke();
    ctx.closePath();
  }
}
