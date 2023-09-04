export class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.fillStyle = "#000";

    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
