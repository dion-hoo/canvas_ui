import { maxDetect } from "./util.js";

const BOUNCE = 0.94;

export class Spring {
  constructor({ x1, y1, x2, y2 }, index, lineWidth, color, vy) {
    const centerX = (x2 - x1) / 2 + x1;
    const centerY = (y2 - y1) / 2 + y1;

    this.index = index;
    this.lineWidth = lineWidth;
    this.color = color;

    this.vy = vy;

    this.point = [
      {
        x: x1,
        y: y1,
      },
      {
        x: centerX,
        y: centerY,
        vx: 0,
        vy: 0,
      },
      {
        x: x2,
        y: y2,
      },
    ];

    this.detect = 30;
    this.isFalled = false;
    this.isTouch = false;
    this.isPlay = false;
  }

  update() {
    if (this.point[2].y > innerHeight * 0.6) {
      this.vy = 0;

      this.point[2].y = innerHeight * 0.6;

      this.isFalled = true;
    }

    if (!this.isFalled) {
      this.vy += 0.1;

      this.point[0].y += this.vy;
      this.point[1].y += this.vy;
      this.point[2].y += this.vy;
    }
  }

  draw(ctx, moveX, moveY) {
    const { detect, point } = maxDetect(
      this.point[0].x,
      this.point[0].y,
      this.point[2].x,
      this.point[2].y,
      moveX,
      moveY,
      this.detect
    );

    if (detect) {
      this.detect = 150;
      this.point[1].x = point.x;
      this.point[1].y = point.y;

      const tx = (moveX - point.x) / 2 + point.x;
      const ty = (moveY - point.y) / 2 + point.y;

      this.point[1].vx = tx - point.x;
      this.point[1].vy = ty - point.y;

      this.isTouch = true;
    } else {
      this.detect = 30;

      const tx = point.x - this.point[1].x;
      const ty = point.y - this.point[1].y;

      this.point[1].vx += tx;
      this.point[1].vy += ty;

      this.point[1].vx *= BOUNCE;
      this.point[1].vy *= BOUNCE;

      if (this.isTouch) {
        this.isPlay = true;
      }
    }

    this.point[1].x += this.point[1].vx;
    this.point[1].y += this.point[1].vy;

    // line

    ctx.save();
    ctx.shadowColor = `#fff`;
    ctx.shadowBlur = 15;

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.point[0].x, this.point[0].y);

    ctx.quadraticCurveTo(
      this.point[1].x,
      this.point[1].y,
      this.point[2].x,
      this.point[2].y
    );

    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }
}
