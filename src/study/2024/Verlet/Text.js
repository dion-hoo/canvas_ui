export class Text {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.text = "Curtain Animation";
  }

  draw(ctx) {
    ctx.fillStyle = "#aaa";
    ctx.font = "700 80px Hind";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(this.text, this.x, this.y);
  }
}
