export class GuideLine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(mouse) {
    this.x = mouse.x || innerWidth * 0.5;
  }

  draw(ctx) {
    ctx.strokeStyle = "#c74b3f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, innerHeight);
    ctx.stroke();
    ctx.closePath();
  }
}
