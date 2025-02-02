export class Sticker {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.grabPoint = {
      x: this.x + this.width - 100,
      y: this.y + 100,
    };

    this.p1 = {
      x: this.x + this.width - 100,
      y: this.y,
    };

    this.p2 = {
      x: this.x + this.width,
      y: this.y + 100,
    };

    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;

    const dist = Math.hypot(dx, dy);

    this.crossDist = dist;
  }

  move(target, point) {
    const dx = target.x - point.x;
    const dy = target.y - point.y;

    const angle = Math.atan2(dy, dx);

    point.x += Math.cos(angle) * 10;
  }

  update(mouse) {
    if (mouse.isDown) {
      const maxX = this.x + this.width;
      const minY = this.y;

      const x = Math.min(maxX, mouse.x);
      const y = Math.max(minY, mouse.y);

      this.grabPoint.x = x;
      this.grabPoint.y = y;

      this.move(this.grabPoint, this.p1);
    }
  }

  drawPoint(ctx, point) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  constraints(t1, t2, max, min) {
    const dx = t2.x - t1.x;
    const dy = t2.y - t1.y;
    const dist = Math.hypot(dx, dy);

    const gap = dist > max ? max : dist < min ? min : dist;
    const angle = Math.atan2(dy, dx);

    t2.x = t1.x + Math.cos(angle) * gap;
    t2.y = t1.y + Math.sin(angle) * gap;
  }

  draw(ctx) {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();

    this.drawPoint(ctx, this.grabPoint);

    this.drawPoint(ctx, this.p1);
    this.drawPoint(ctx, this.p2);

    this.constraints(this.grabPoint, this.p1, this.height, 0);
    this.constraints(this.grabPoint, this.p2, this.height, 0);

    this.constraints(this.p1, this.p2, this.height, this.crossDist);
  }
}
