import { Point } from "./Point.js";
import { alphabet } from "./alphabet.js";

export class Text {
  constructor(x, y, label) {
    this.x = x;
    this.y = y;
    this.radius = 10;

    this.isFinish = true;

    this.point = [];
    this.prev = {
      x: 0,
      y: 0,
      time: 0,
    };

    // const text = alphabet[label];

    // for (let i = 0; i < text.length; i++) {
    //   const t = text[i];

    //   this.point.push(
    //     new Point({
    //       x: this.x + t.x,
    //       y: this.y + t.y,
    //       isMoveTo: t.isMoveTo,
    //       isCurve: t.isCurve,
    //     })
    //   );
    // }

    this.point[0] = new Point({
      x: this.x + 80,
      y: this.y,
      isMoveTo: true,
    });

    this.point[1] = new Point({
      x: this.x + 80,
      y: this.y - 80,
      isCurve: true,
    });

    this.point[2] = new Point({
      x: this.x,
      y: this.y - 80,
    });

    this.point[3] = new Point({
      x: this.x - 80,
      y: this.y - 80,
      isCurve: true,
    });

    this.point[4] = new Point({
      x: this.x - 80,
      y: this.y,
    });

    this.point[5] = new Point({
      x: this.x - 80,
      y: this.y + 80,
      isCurve: true,
    });

    this.point[6] = new Point({
      x: this.x,
      y: this.y + 80,
    });

    this.point[7] = new Point({
      x: this.x + 80,
      y: this.y + 80,
      isCurve: true,
    });

    this.point[8] = new Point({
      x: this.x + 80,
      y: this.y,
    });
  }

  lerp(p1, p2, d1) {
    return (1 - d1) * p1 + d1 * p2;
  }

  draw(ctx) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 30;
    ctx.beginPath();

    for (let i = 0; i < this.point.length; i++) {
      const p = this.point[i];

      this.isFinish = true;

      for (let j = 0; j < i; j++) {
        const checkPoint = this.point[j];

        if (checkPoint.time < 1 && !checkPoint.isCurve) {
          this.isFinish = false;
          break;
        }
      }

      if (!this.isFinish) {
        break;
      }

      // draw
      if (p.isMoveTo) {
        ctx.moveTo(p.x, p.y);
      } else {
        if (p.isCurve) {
          const x1 = this.lerp(this.prev.x, p.x, p.time);
          const y1 = this.lerp(this.prev.y, p.y, p.time);

          const next = this.point[i + 1];

          const x2 = this.lerp(p.x, next.x, next.time);
          const y2 = this.lerp(p.y, next.y, next.time);

          const cx = this.lerp(x1, x2, next.time);
          const cy = this.lerp(y1, y2, next.time);

          ctx.quadraticCurveTo(x1, y1, cx, cy);
        } else {
          if (!this.point[i - 1].isCurve) {
            const tx = this.lerp(this.prev.x, p.x, p.time);
            const ty = this.lerp(this.prev.y, p.y, p.time);

            ctx.lineTo(tx, ty);
          }
        }
      }

      if (p.time < 1) {
        p.time += p.timeSpeed;
      } else {
        p.time = 1;
      }

      this.prev = p;
    }
    ctx.stroke();

    // ============= point  ============= //
    // ctx.fillStyle = "red";
    // for (let i = 0; i < this.point.length; i++) {
    //   const p = this.point[i];

    //   ctx.beginPath();
    //   ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    //   ctx.fill();
    // }

    // ctx.strokeStyle = "#fff";
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.strokeRect(this.x - 150, this.y - 150, 300, 300);
    // ctx.stroke();
  }
}
