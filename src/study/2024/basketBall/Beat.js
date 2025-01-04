export class Beat {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;

    this.minY = innerHeight * 0.36;
    this.maxY = innerHeight * 0.81;

    this.radius = 0;
    this.origianlRadius = radius;
    this.color = color;

    this.isEnd = false;
  }

  update(target) {
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const radian = Math.atan2(dy, dx);
    const force = 2;

    this.x += Math.cos(radian) * force;
    this.y += Math.sin(radian) * force;

    const ratio = (this.y - this.minY) / (this.maxY - this.minY);
    const radius = Math.min(1, ratio);

    this.radius = this.origianlRadius * radius;

    if (this.y > innerHeight - this.radius) {
      this.isEnd = true;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowBlur = 30;
    ctx.shadowColor = this.color;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
