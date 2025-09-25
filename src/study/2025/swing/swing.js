export class Swing {
  constructor(x, y, width, length, angle) {
    this.r1 = {
      x: x - width / 2,
      y: y,
    };
    this.r2 = {
      x: x + width / 2,
      y: y,
    };
    this.t1 = {
      x: x - width / 2,
      y: y,
    };
    this.t2 = {
      x: x + width / 2,
      y: y,
    };

    this.width = width;

    this.angle = (angle * Math.PI) / 180;
    this.angleVel = 0;
    this.length = length;
    this.gravity = 0.09;
  }

  updateAngle() {
    const force = Math.sin(this.angle) * (-this.gravity / (this.length * 0.1));

    this.angleVel += force;
    this.angle += this.angleVel;

    this.angleVel *= 0.996;
  }

  grab(ctx, mouse, r) {
    if (mouse.isDown) {
      const w = {
        x: mouse.x - r.x,
        y: mouse.y - r.y,
      };

      const minDist = 50;
      const radian = Math.atan2(w.y, w.x);
      const angle = 90 - (radian * 180) / Math.PI;

      this.angle = (angle * Math.PI) / 180;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, minDist / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawLine(ctx, start, end) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);

    const x1 = end.x + Math.sin(this.angle) * this.length;
    const y1 = end.y + Math.cos(this.angle) * this.length;

    ctx.lineTo(x1, y1);
    ctx.stroke();

    return { x: x1, y: y1 };
  }

  drawBoard(ctx, r1, r2) {
    const width = this.width * 1.2;
    const height = 20;
    const side = r2.x - r1.x;

    // ctx.fillStyle = "#95400d";
    ctx.fillStyle = "#000";
    ctx.beginPath();

    const x1 = r1.x + side / 2 - width / 2;
    const x2 = r1.y;

    ctx.roundRect(x1, x2, width, height, [height / 2]);
    ctx.fill();
  }

  draw(ctx, mouse) {
    this.grab(ctx, mouse, this.r1);
    this.grab(ctx, mouse, this.r2);

    const r1 = this.drawLine(ctx, this.r1, this.t1);
    const r2 = this.drawLine(ctx, this.r2, this.t2);

    this.drawBoard(ctx, r1, r2);
  }
}
