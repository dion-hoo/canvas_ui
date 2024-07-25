import { Flower } from "./flower.js";

export class Stem {
  constructor(index, x, y, size, image, direction, lineWidth, wind) {
    this.index = index;
    this.startX = x;
    this.startY = y;

    this.endX = x;
    this.endY = y - size;
    this.spin = 0;

    this.centerX = (this.startX + this.endX) / 2;
    this.centerY = (this.startY + this.endY) / 2;

    this.time1 = 0;
    this.time2 = 0;
    this.isReversed = false;

    this.controlPoint = size * 0.2 * direction;
    this.isEnd = false;

    this.speed = 0.03;

    this.bezierX = 0;
    this.bezierY = 0;

    this.lineWidth = lineWidth;
    this.wind = wind;

    this.flower = new Flower(index, image, this.endX, this.endY, wind);
  }

  lerp(p1, p2, t) {
    return (1 - t) * p1 + t * p2;
  }

  update(ctx, x1, y1, cx, cy, x2, y2, time) {
    this.bezierX =
      (1 - time) ** 2 * x1 + 2 * (1 - time) * time * cx + time * time * x2;
    this.bezierY =
      (1 - time) ** 2 * y1 + 2 * (1 - time) * time * cy + time * time * y2;

    const tx1 = this.lerp(x1, cx, 0);
    const ty1 = this.lerp(y1, cy, 0);

    const tx2 = this.lerp(cx, x2, 0);
    const ty2 = this.lerp(cy, y2, 0);

    const cpx = this.lerp(tx1, tx2, time);
    const cpy = this.lerp(ty1, ty2, time);

    ctx.quadraticCurveTo(cpx, cpy, this.bezierX, this.bezierY);
  }

  draw(ctx, inputValue) {
    ctx.strokeStyle = "#375537";
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);

    const cx = (this.startX + this.centerX + this.controlPoint) / 2;
    const cy = (this.startY + this.centerY) / 2;

    if (this.time1 >= 1) {
      this.time1 = 1;
      this.isReversed = true;
    } else {
      this.time1 += this.speed;
    }

    this.update(
      ctx,
      this.startX,
      this.startY,
      cx,
      cy,
      this.centerX,
      this.centerY,
      this.time1
    );

    if (this.isReversed) {
      const cx = (this.centerX + this.endX - this.controlPoint) / 2;
      const cy = (this.centerY + this.endY) / 2;

      if (this.time2 >= 1) {
        this.time2 = 1;
        this.isEnd = true;

        if (inputValue === "wind") {
          this.spin += this.wind.x;

          const windX = Math.sin(this.index + this.spin) * 2;
          const centerWindX = Math.sin(this.index + this.spin) * 0.2;
          this.endY += windX;
          this.centerX += centerWindX;
        }
      } else {
        this.time2 += this.speed;
      }

      this.update(
        ctx,
        this.centerX,
        this.centerY,
        cx,
        cy,
        this.endX,
        this.endY,
        this.time2
      );
    }

    ctx.stroke();
    ctx.closePath();

    this.flower.draw(ctx, this.isEnd, inputValue);
  }
}
