import { Vector } from "./Vector.js";

export class Line {
  constructor(x, y) {
    this.anchor = new Vector(x, y);

    this.angle = (0 * Math.PI) / 180;
    this.restLength = 15;
    this.radius = 50;
    this.veloctiy = new Vector(0, 0);
    this.mass = 1;
    this.dragging = false;
    this.isGrab = false;
    this.damping = 0.9;
    this.chainLength = 20;

    this.chainList = [];

    const px = this.anchor.x + Math.sin(this.angle) * this.restLength;
    const py = this.anchor.y + Math.cos(this.angle) * this.restLength;

    this.circle = new Vector(px, py);

    let cx = this.circle.x;
    let cy = this.circle.y;
    for (let i = 0; i < 8; i++) {
      const index = i % 2;

      const degree = 90 * index + 45;
      const angle = (degree * Math.PI) / 180;
      const x = cx + Math.cos(angle) * this.chainLength;
      const y = cy + Math.sin(angle) * this.chainLength;

      this.chainList.push(new Vector(x, y));

      cx = x;
      cy = y;
    }
  }

  update(mouse) {
    const gravity = new Vector(0, 0.8);
    const k = 0.1;

    const dx = mouse.startX - this.circle.x;
    const dy = mouse.startY - (this.circle.y + this.radius + 3);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (mouse.isDown) {
      if (dist <= this.radius && !this.isGrab) {
        this.dragging = true;
        this.diffX = this.circle.x - mouse.startX;
        this.diffY = this.circle.y + this.radius + 3 - mouse.startY;

        this.isGrab = true;
      }
    }

    if (this.dragging && mouse.isMove) {
      this.circle.x = mouse.x + this.diffX;
      this.circle.y = mouse.y + this.diffY - (this.radius + 3);
    }

    if (!this.dragging && !mouse.isGrab) {
      const sideLength = new Vector(this.circle.x, this.circle.y).sub(
        this.anchor
      );

      const currentLength = new Vector(sideLength.x, sideLength.y).mag();
      const x = currentLength - this.restLength;

      const direction = new Vector(sideLength.x, sideLength.y).normalize();

      const force = new Vector(direction.x, direction.y).mult(x * k * -1);

      this.veloctiy.add(gravity);
      this.veloctiy.add(force);

      this.veloctiy.mult(this.damping);
      this.veloctiy.div(this.mass);

      this.circle.add(this.veloctiy);
    }
  }

  draw(ctx) {
    // chain
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.anchor.x, this.anchor.y);

    let prevX = this.chainList[0].x;
    let prevY = this.chainList[0].y;

    this.chainList.forEach((c) => {
      ctx.quadraticCurveTo(c.x, c.y, prevX, prevY);

      prevX = c.x;
      prevY = c.y;
    });

    ctx.lineTo(this.circle.x, this.circle.y);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.anchor.x, this.anchor.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.circle.x, this.circle.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // circle
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(
      this.circle.x,
      this.circle.y + this.radius + 3,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();
  }
}
