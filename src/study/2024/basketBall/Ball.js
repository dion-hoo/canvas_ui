import { Point } from "./Point.js";

export class Ball extends Point {
  constructor(x, y, raidus) {
    super(false, x, y, raidus, null, { x: 0, y: 0 });

    this.initialRadius = this.radius;

    this.isRimPassed = false;
    this.isPassProcessed = false;
    this.isOnceDistance = false;
    this.isShooting = false;
    this.isEnd = false;

    this.dx = 0;
    this.dy = 0;
    this.shootForce = 0.6;

    this.score = 0;
    this.isScored = false;

    // rotate
    this.isRotate = false;
    this.rotateDirectionLocked = true;
    this.rotateDirection = 1;
    this.angle = 0;

    // time
    this.resetFps = 4;
    this.resetFpsTime = 1000 / this.resetFps;
    this.resetTime = 0;

    // image
    this.image = new Image();
    this.image.src = "./ball.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
    this.isLoaded = false;
  }

  reset() {
    this.x = innerWidth * 0.5;
    this.y = innerHeight - this.initialRadius;

    this.oldX = this.x;
    this.oldY = this.y;

    this.vx = 0;
    this.vy = 0;

    this.gravity = {
      x: 0,
      y: 0,
    };

    this.radius = this.initialRadius;

    this.isRotate = false;
    this.angle = 0;
    this.rotateDirection = 1;

    this.isRimPassed = false;
    this.isPassProcessed = false;
    this.isOnceDistance = false;
    this.isShooting = false;
    this.isEnd = false;

    this.floorCount = 0;

    this.isScored = false;

    this.dx = 0;
    this.dy = 0;
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

        this.reset();

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

  draw(ctx, target) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (!this.rotateDirectionLocked) {
      const vec1 = {
        x: target.x - this.x,
        y: target.y - this.y,
      };
      const vec2 = {
        x: innerWidth * 0.5 - this.x,
        y: 0 - this.y,
      };
      const cross = vec1.x * vec2.y - vec1.y * vec2.x;

      const angle = Math.atan2(vec1.y, vec1.x);
      const degress = Math.abs((angle * 180) / Math.PI);

      this.isRotate = degress < 85 || 95 < degress;
      this.rotateDirection = cross > 0 ? -1 : 1;
      this.rotateDirectionLocked = true;
    }

    const speed = Math.hypot(this.vx, this.vy) * 0.01;

    if (!this.isEnd) {
      this.angle += speed * this.rotateDirection;
    }

    if (this.isRotate) {
      ctx.rotate(this.angle);
    }

    if (this.isLoaded) {
      const size = this.radius * 2;
      ctx.drawImage(this.image, -size / 2, -size / 2, size, size);
    }

    ctx.restore();
  }
}
