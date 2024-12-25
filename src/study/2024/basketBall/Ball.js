import { Point } from "./Point.js";

export class Ball extends Point {
  constructor(x, y, raidus, color) {
    super(false, x, y, raidus, color);

    this.image = new Image();
    this.image.src = "./ball.png";
    this.image.onload = () => {
      this.isLoaded = true;
    };
    this.isLoaded = false;

    this.rotateDirection = Math.random() > 0.5 ? 1 : -1;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);

    const radian = this.y * 0.009 * this.rotateDirection;

    ctx.rotate(radian);

    if (this.isLoaded) {
      const size = this.radius * 2;
      ctx.drawImage(this.image, -size / 2, -size / 2, size, size);
    }

    ctx.restore();
  }
}
