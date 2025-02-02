export class Swing {
  constructor(x, y, width, length, angle) {
    this.r1 = {
      x: x - width / 2,
      y: y,
    };
    this.r2 = {
      x: x + width / 2,
      y: y - width / 3,
    };
    this.t1 = {
      x: x - width / 2,
      y: y,
    };
    this.t2 = {
      x: x + width / 2,
      y: y + (this.length - width / 3),
    };

    this.angle = (angle * Math.PI) / 180;
    this.angleVel = 0;
    this.length = length;
    this.gravity = 0.1;
  }

  move(ctx, mouse, r, t) {
    if (mouse.isDown) {
      const v = {
        x: t.x - r.x,
        y: t.y - r.y,
      };

      const w = {
        x: mouse.x - r.x,
        y: mouse.y - r.y,
      };

      const cross = v.x * w.y - v.y * w.x;
      const vDist = Math.hypot(v.x, v.y);
      const dist = Math.abs(cross / vDist);
      const minDist = 50;

      const radian = Math.atan2(w.y, w.x);
      const angle = 90 - (radian * 180) / Math.PI;

      const setAngle = Math.max(-70, Math.min(70, angle));

      this.angle = (setAngle * Math.PI) / 180;

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, minDist, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  update() {
    const force = Math.sin(this.angle) * (-this.gravity / (this.length * 0.1));

    this.angleVel += force;
    this.angle += this.angleVel;

    this.angleVel *= 0.996;
  }

  drawFloor(ctx, x1, y1, x2, y2) {
    ctx.strokeStyle = "#95400d";
    ctx.beginPath();
    ctx.moveTo(x1 - 50, y1);
    ctx.lineTo(x2 - 50, y2);
    ctx.lineTo(x2 + 50, y2);
    ctx.lineTo(x1 + 50, y1);
    ctx.lineTo(x1 - 50, y1);
    ctx.stroke();
  }

  draw(ctx, mouse) {
    this.move(ctx, mouse, this.r1, this.t1);
    this.move(ctx, mouse, this.r2, this.t2);

    ctx.strokeStyle = "#95400d";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(this.r1.x, this.r1.y);

    const x1 = this.r1.x + Math.sin(this.angle) * this.length;
    const y1 = this.r1.y + Math.cos(this.angle) * this.length;

    ctx.lineTo(x1, y1);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.r2.x, this.r2.y);

    const x2 = this.r2.x + Math.sin(this.angle) * this.length;
    const y2 = this.r2.y + Math.cos(this.angle) * this.length;

    ctx.lineTo(x2, y2);
    ctx.stroke();

    this.drawFloor(ctx, x1, y1, x2, y2);
  }
}
