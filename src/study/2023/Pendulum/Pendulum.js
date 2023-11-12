export class Pendulum {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.agnle = (Math.random() * 180 * Math.PI) / 180;
    this.aVelocity = 0;
    this.aAcceleration = 0;
    this.damping = 0.96;
  }

  update() {
    const gravity = 0.4;

    this.aAcceleration = -(gravity / this.radius) * Math.sin(this.agnle);

    this.aVelocity += this.aAcceleration;
    this.agnle += this.aVelocity;

    this.aVelocity *= this.damping;
  }

  draw(ctx) {
    const x = this.x + Math.sin(this.agnle) * this.radius;
    const y = this.y + Math.cos(this.agnle) * this.radius;

    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
