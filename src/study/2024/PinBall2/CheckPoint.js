export class CheckPoint {
  constructor(ctx, x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = color;

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

export const checkPoint = (ctx, x, y, color) => {
  return new CheckPoint(ctx, x, y, color);
};
