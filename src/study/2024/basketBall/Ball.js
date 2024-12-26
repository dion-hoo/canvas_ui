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

    this.isGetTargetCoordinate = true;

    this.rotateDirection = 1;
    this.angle = 0;
  }

  draw(ctx, target) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (!this.isgetTargetCoordinate) {
      const dx = target.x - this.x;
      const dy = target.y - this.y;

      const cross = this.vx * dy - this.vy * dx;

      this.rotateDirection = cross > 0 ? 1 : -1;
      this.isGetTargetCoordinate = true;
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
