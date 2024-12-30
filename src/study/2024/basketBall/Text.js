export class Text {
  constructor(text, x, y) {
    this.x = x;
    this.y = y;
    this.text = text;
  }

  draw(ctx) {
    const fontSize = innerHeight * 0.05;

    ctx.font = `${fontSize}px blackHanSans`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";

    ctx.fillText(this.text, this.x, this.y);
  }
}
