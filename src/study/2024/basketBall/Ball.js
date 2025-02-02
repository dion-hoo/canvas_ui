import { Point } from "./Point.js";

export class Ball extends Point {
  constructor(x, y, raidus) {
    super(false, x, y, raidus, null, { x: 0, y: 0 });

    this.initialRadius = this.radius;

    this.isRimPassed = false;
    this.isPassProcessed = false;
    this.isOnceDistance = false;
    this.isShooting = false;

    this.dx = 0;
    this.dy = 0;
    this.shootForce = 0.6;

    this.score = 0;
    this.isStart = false;
    this.isScored = false;

    this.shadowBlur = innerHeight * 0.01;

    // time
    this.resetFps = 4;
    this.resetFpsTime = 1000 / this.resetFps;
    this.resetTime = 0;
  }

  shouldResetTime = (timeStamp) => {
    if (!this.resetTime) {
      this.resetTime = timeStamp;
    }

    const now = timeStamp - this.resetTime;

    this.resetTime++;

    if (now > this.resetFpsTime) {
      this.resetTime = timeStamp;
      return true;
    } else {
      return false;
    }
  };

  throw(timeStamp, mouse) {
    this.shooting(mouse);

    if (!this.isEnd) {
      this.update(1);
    }

    if (
      this.isEnd ||
      this.x < this.radius ||
      this.x > innerWidth - this.radius
    ) {
      const isStart = this.shouldResetTime(timeStamp);

      if (isStart) {
        mouse.isStart = false;
        mouse.isDown = false;

        this.isEnd = true;

        this.resetTime = null;
      }
    }
  }

  shooting(target) {
    if (!this.isOnceDistance) {
      this.dx = target.x - this.x;
      this.dy = target.y - this.y;

      this.isOnceDistance = true;
    }

    const radian = Math.atan2(this.dy, this.dx);

    const minRadius = this.initialRadius / 1.6;
    const maxRadius = this.initialRadius;
    const referenceY = innerHeight - this.radius;

    this.radius =
      maxRadius - (maxRadius - minRadius) * (1 - this.y / referenceY);

    if (!this.isShooting && target.y < this.y) {
      this.x += Math.cos(radian) * this.shootForce;
      this.y += Math.sin(radian) * this.shootForce;
    } else {
      if (target.y > this.y) {
        this.gravity.y = 0.4;
      }

      this.isShooting = true;
    }
  }

  updatePassedBall() {
    const overlapY = innerHeight * 0.2;

    if (this.y + this.radius < overlapY && !this.isPassProcessed) {
      this.isRimPassed = true;
      this.isPassProcessed = true;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
