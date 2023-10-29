export class Quality {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.r = 0;
  }

  draw(ctx) {
    this.angle += 0.09;

    this.r = Math.sin(this.angle) * 5;

    ctx.font = "800 40px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";

    ctx.save();
    ctx.beginPath();

    ctx.translate(this.x, this.y);
    ctx.rotate((this.r * Math.PI) / 180);

    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 30;

    ctx.fillStyle = "pink";
    ctx.fillText("4K", 0, 23);
    ctx.clip();

    ctx.fillStyle = "#000";
    ctx.arc(0, 10, 40, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
