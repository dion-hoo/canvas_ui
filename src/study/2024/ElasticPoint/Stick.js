export class Stick {
  constructor(p1, p2, maxLength) {
    this.p1 = p1;
    this.p2 = p2;
    this.maxLength = maxLength;
  }

  update() {
    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const diff = this.maxLength - dist;
    const percent = diff / dist / 2;

    let offsetX = dx * percent;
    let offsetY = dy * percent;

    this.p1.x -= offsetX;
    this.p1.y -= offsetY;

    this.p2.x += offsetX;
    this.p2.y += offsetY;
  }

  draw(ctx) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.closePath();
  }
}
