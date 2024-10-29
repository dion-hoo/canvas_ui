import { easeOutQuint } from "./easing.js";

export class Point {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.oldX = x;
    this.oldY = y;
    this.ox = x;
    this.oy = y;
    this.vx = 0;
    this.vy = 0;
    this.px = Math.random() * size * 4 - size * 2;
    this.py = Math.random() * size * 4 - size * 2;

    this.mouse = {
      x: 0,
      y: 0,
    };
    this.isMove = false;

    this.force = {
      x: 0,
      y: 0,
    };
    this.mass = this.size * 1.2;

    // fps
    this.fps = 60;
    this.duration = 2.5;
    this.currneTime = 0;
    this.timeStamp = 0;

    this.opacity = 0.8;
    this.scale = 1;
    this.rotate = 0;
    this.rotateDirection = Math.random() > 0.5 ? 1 : -1;

    this.image = new Image();
    this.image.src = "./smoke.png";
  }

  update(dt) {
    this.vx = this.x - this.oldX;
    this.vy = this.y - this.oldY;

    this.oldX = this.x;
    this.oldY = this.y;

    const ax = this.force.x / this.mass;
    const ay = this.force.y / this.mass;

    this.x += this.vx + ax * dt * dt;
    this.y += this.vy + ay * dt * dt;
  }

  spread(mouse) {
    if (!this.isMove) {
      this.mouse.x = mouse.x + this.px;
      this.mouse.y = mouse.y + this.py;
    }

    if (this.isMove || mouse.isDown) {
      this.isMove = true;

      const endTime = this.fps * this.duration;

      if (!this.currneTime) {
        this.currneTime = this.timeStamp;
      }

      const startTime = this.timeStamp - this.currneTime;
      const ratio = startTime / endTime;

      this.timeStamp += 1;

      if (startTime < endTime) {
        this.x = this.ox + (this.mouse.x - this.ox) * easeOutQuint(ratio);
        this.y = this.oy + (this.mouse.y - this.oy) * easeOutQuint(ratio);

        this.oldX = this.x;
        this.oldY = this.y;

        this.opacity = 0.8 - ratio;
        this.scale = 1 + ratio * 2.5;
        this.rotate = ratio * this.rotateDirection;
      } else {
        this.opacity = 0;
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "#fff";

    ctx.globalAlpha = this.opacity < 0 ? 0 : this.opacity;

    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.rotate);

    ctx.beginPath();
    ctx.drawImage(
      this.image,
      -this.size / 2,
      -this.size / 2,
      this.size,
      this.size
    );
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
}
