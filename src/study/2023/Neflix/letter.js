import { util } from "./util.js";
import { LineGroup } from "./LineGroup.js";

const BOUNCE = 0.93;

export class Letter {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.lines = new LineGroup(x, y).lines;
    this.index = 0;
    this.time = 0.03;
    this.time2 = 0.045;
    this.detect = 5;
    this.isEnd = false;
  }

  fill() {
    for (let i = 0; i < this.lines.length; i++) {
      const { point } = this.lines[i];

      const p = point[this.index];

      if (point.length - 1 === this.index) {
        this.isEnd = true;
      }

      if (p.t < 1) {
        if (this.index >= 1) {
          p.t += this.time2;
        } else {
          p.t += this.time;
        }

        if (p.t > 1) {
          p.t = 1;
        }
      } else {
        if (this.index < point.length - 1) {
          this.index++;
        }
      }
    }
  }

  drawText(ctx) {
    for (let i = 0; i < this.lines.length; i++) {
      const { point } = this.lines[i];

      for (let j = 0; j < point.length - 1; j++) {
        const p1 = point[j];
        const p2 = point[j + 1];

        const px = util.lerp(p1.x, p2.x, p1.t);
        const py = util.lerp(p1.y, p2.y, p1.t);

        p1.cx = Math.floor(p1.x + (px - p1.x) / 2);
        p1.cy = Math.floor(p1.y - (p1.y - py) / 2);

        ctx.save();

        ctx.lineWidth = 5;
        ctx.strokeStyle = j === 1 ? "rgb(229, 9, 20)" : "rgb(178, 7, 16)";
        ctx.globalCompositeOperation = p1.composite ?? "none";

        ctx.beginPath();

        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(px, py);

        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    }
  }

  stringText(ctx, moveX, moveY) {
    for (let i = 0; i < this.lines.length; i++) {
      const { point } = this.lines[i];

      for (let j = 0; j < point.length - 1; j++) {
        const p1 = point[j];
        const p2 = point[j + 1];

        const { detect, x, y } = util.projection(
          ctx,
          p1.x,
          p1.y,
          p2.x,
          p2.y,
          moveX,
          moveY,
          this.detect
        );

        if (detect) {
          this.detect = 400;

          const tx = (moveX - p1.cx) / 2;
          const ty = (moveY - p1.cy) / 2;

          p1.vx = tx;
          p1.vy = ty;
        } else {
          this.detect = 5;

          const tx = x - p1.cx;
          const ty = y - p1.cy;

          p1.vx += tx;
          p1.vy += ty;

          p1.vx *= BOUNCE;
          p1.vy *= BOUNCE;
        }

        p1.cx += p1.vx;
        p1.cy += p1.vy;

        ctx.save();

        ctx.shadowColor = "#fff";
        ctx.shadowBlur = p1.shdowBlur;

        ctx.lineWidth = p1.lineWidth;
        ctx.strokeStyle = p1.color;
        ctx.globalCompositeOperation = p1.composite ?? "none";

        ctx.beginPath();

        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(p1.cx, p1.cy, p2.x, p2.y);

        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    }
  }
}
