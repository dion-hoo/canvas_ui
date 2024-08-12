const BOUNCE = 0.92;

export class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;

    this.cx = x1 + (x2 - x1) / 2;
    this.cy = y1 + (y2 - y1) / 2;

    this.fixedCx = x1 + (x2 - x1) / 2;
    this.fixedCy = y1 + (y2 - y1) / 2;

    this.vx = 0;
    this.vy = 0;

    this.radius = 20;

    this.detect = 400;

    this.v1 = {
      x: 0,
      y: 0,
    };
    this.v2 = {
      x: 0,
      y: 0,
    };

    this.points = [];
  }

  projection(mouse) {
    this.v1 = {
      x: mouse.x - this.x1,
      y: mouse.y - this.y1,
    };

    this.v2 = {
      x: this.x2 - this.x1,
      y: this.y2 - this.y1,
    };

    const v2Mag = Math.sqrt(this.v2.x * this.v2.x + this.v2.y * this.v2.y);

    const dot = this.v1.x * this.v2.x + this.v1.y * this.v2.y;
    const proj = dot / (v2Mag * v2Mag);

    const projVector = {
      x: proj * this.v2.x,
      y: proj * this.v2.y,
    };

    const x = this.x1 + projVector.x;
    const y = this.y1 + projVector.y;

    this.cx = x;
    this.cy = y;

    this.fixedCx = x;
    this.fixedCy = y;

    this.isGrab = false;
  }

  update(mouse) {
    const dx = mouse.x - this.fixedCx;
    const dy = mouse.y - this.fixedCy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (mouse.isDown && !this.isGrab) {
      this.projection(mouse);
    }

    if (distance < this.detect && mouse.isDown) {
      const tx = (mouse.x + this.fixedCx) / 2;
      const ty = (mouse.y + this.fixedCy) / 2;

      this.vx = tx - this.cx;
      this.vy = ty - this.cy;

      this.isGrab = true;
    } else {
      const tx = this.fixedCx - this.cx;
      const ty = this.fixedCy - this.cy;

      this.vx += tx;
      this.vy += ty;

      this.vx *= BOUNCE;
      this.vy *= BOUNCE;
    }

    this.cx += this.vx;
    this.cy += this.vy;

    this.points = [
      { x: this.x1, y: this.y1 },
      { x: this.cx, y: this.cy },
      { x: this.x2, y: this.y2 },
    ];
  }

  draw(ctx) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.cx, this.cy);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
