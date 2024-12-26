import { Point } from "./Point.js";

export class Ball extends Point {
  constructor(x, y, raidus, color) {
    super(false, x, y, raidus, color, { x: 0, y: 0 });

    this.image = new Image();
    this.image.src = "./ball.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
    this.isLoaded = false;

    this.isSetRotateDirection = true;
    this.rotateDirection = 1;
    this.angle = 0;

    this.isRimPassed = false;
    this.isPassProcessed = false;

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

        this.isRmPassed = false;
        this.isPassProcessed = false;

        this.reset();
        this.setOriginalCroods();

        this.resetTime = null;
      }
    }
  }

  updatePassedBall() {
    const overlapY = innerHeight * 0.2;

    if (this.y + this.radius < overlapY && !this.isPassProcessed) {
      this.isRmPassed = true;
      this.isPassProcessed = true;
    }
  }

  draw(ctx, target) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (!this.isSetRotateDirection) {
      const dx = target.x - this.x;
      const dy = target.y - this.y;

      const cross = this.vx * dy - this.vy * dx;

      this.rotateDirection = cross > 0 ? 1 : -1;
      this.isSetRotateDirection = true;
    }

    const speed = Math.hypot(this.vx, this.vy) * 0.01;

    this.angle += speed * this.rotateDirection;

    ctx.rotate(this.angle);

    if (this.isLoaded) {
      const size = this.radius * 2;
      ctx.drawImage(this.image, -size / 2, -size / 2, size, size);
    }

    ctx.restore();
  }
}
