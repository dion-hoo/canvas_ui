export class Wifi {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
  }

  draw(ctx, timestamp) {
    timestamp *= 0.5;

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate((-135 * Math.PI) / 180);

    this.angle = timestamp;

    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 20;

    const gradient = ctx.createRadialGradient(0, 0, 8, 0, 0, 48);

    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.1, "orange");
    gradient.addColorStop(0.2, "orange");
    gradient.addColorStop(0.3, "yellow");
    gradient.addColorStop(0.4, "yellow");
    gradient.addColorStop(0.5, "blue");
    gradient.addColorStop(0.6, "blue");
    gradient.addColorStop(0.7, "green");
    gradient.addColorStop(0.8, "green");
    gradient.addColorStop(0.9, "purple");
    gradient.addColorStop(1, "purple");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 48, 0, (this.angle * Math.PI) / 180);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
