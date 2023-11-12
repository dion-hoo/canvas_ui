export class Oscillator {
  constructor() {
    this.x = 0;
    this.angle = 0;
    this.vy = 0.0001;
    this.amplitude = 100;
  }

  update() {}

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "#fff";

    for (let x = 0; x < innerWidth; x += 24) {
      this.x = x;
      this.y = Math.sin(this.angle) * this.amplitude;

      this.angle += this.vy;

      ctx.beginPath();
      ctx.arc(this.x, this.y + innerHeight / 2, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }

    ctx.restore();
  }
}
