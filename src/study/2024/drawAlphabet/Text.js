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
    this.timePath = [];
    this.specificPoint = [0, 0.2, 0.4, 0.6, 0.8];

    // true false
    this.isLine = true;
    this.isThick = false;
    this.chococat = true;
    this.isLeaf = true;

    const text = alphabet[label];

    for (let i = 0; i < text.length; i++) {
      const t = text[i];

      this.point.push(
        new Point({
          x: this.x + t.x,
          y: this.y + t.y,
          isMoveTo: t.isMoveTo,
          isCurve: t.isCurve,
        })
      );
    }

    this.image = new Image();
    this.image.src = this.isLeaf ? "./leaf1.png" : "./chococat.png";
  }

  lerp(p1, p2, d1) {
    return (1 - d1) * p1 + d1 * p2;
  }

  getSpecificPoint(time, x, y) {
    this.specificPoint.forEach((p) => {
      if (Math.abs(time - p) < 0.00001) {
        this.timePath.push({
          x,
          y,
          angle: Math.random() * 360,
          angleSpeed: Math.random() * 0.01 + 0.005,
        });
      }
    });
  }

  draw(ctx) {
    if (this.isLeaf) {
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
    } else {
      ctx.strokeStyle = "#121212";
      ctx.lineWidth = this.isThick ? 25 : 1;
    }

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

          if (this.isLine) {
            ctx.quadraticCurveTo(x1, y1, cx, cy);
          }

          this.getSpecificPoint(next.time, cx, cy);
        } else {
          if (!this.point[i - 1].isCurve) {
            const tx = this.lerp(this.prev.x, p.x, p.time);
            const ty = this.lerp(this.prev.y, p.y, p.time);

            if (this.isLine) {
              ctx.lineTo(tx, ty);
            }

            this.getSpecificPoint(p.time, tx, ty);
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

    if (this.isLeaf || this.chococat) {
      ctx.fillStyle = "purple";
      for (let i = 0; i < this.timePath.length; i++) {
        const time = this.timePath[i];

        ctx.save();
        ctx.translate(time.x, time.y);

        if (this.isLeaf) {
          time.angle += time.angleSpeed;
        }

        ctx.rotate(Math.sin(time.angle));
        ctx.beginPath();

        if (this.isLeaf) {
          const width = 13; // 188
          const height = width * 1.825; // 343;

          ctx.drawImage(this.image, -1.5, -height, width, height);
        } else {
          const width = 25; // 133
          const height = width * 0.782; // 104

          ctx.drawImage(this.image, -width / 2, -height / 2, width, height);
        }

        ctx.restore();
      }
    }

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
