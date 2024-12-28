import { projection } from "./util.js";

export class Rim {
  constructor(x, y, padding, netWidth, rowGap, columnGap, color) {
    this.x = x;
    this.y = y;
    this.padding = padding;
    this.netWidth = netWidth;
    this.rowGap = rowGap;
    this.columnGap = columnGap;
    this.color = color;
    this.size = 10;

    this.boardWidth = 60;
    this.boardHeight = 30;

    const sideSize = 20;
    this.collsitionTopPoint = [
      { x: this.x, y: this.y },
      {
        x: this.x + sideSize,
        y: this.y,
      },
      {
        x: this.x + this.netWidth - sideSize,
        y: this.y,
      },
      {
        x: this.x + this.netWidth,
        y: this.y,
      },
    ];
  }

  collision(ball, collisionPoint) {
    for (let i = 0; i < this.collsitionTopPoint.length; i += 2) {
      const p1 = this.collsitionTopPoint[i];
      const p2 = this.collsitionTopPoint[i + 1];

      if (ball.isRimPassed) {
        const { x, y } = projection(ball, p1, p2);

        const dx = ball.x - x;
        const dy = ball.y - y;
        const dist = Math.hypot(dx, dy);
        const normal = {
          x: dx / dist,
          y: dy / dist,
        };

        if (dist < ball.radius) {
          const normalVector = {
            x: normal.x * ball.radius,
            y: normal.y * ball.radius,
          };

          const dot = ball.vx * normal.x + ball.vy * normal.y;

          ball.vx += -2 * dot * normal.x;
          ball.vy += -2 * dot * normal.y;

          ball.vx *= 0.89;
          ball.vy *= 0.89;

          ball.x = x + normalVector.x;
          ball.y = y + normalVector.y;

          ball.oldX = ball.x - ball.vx;
          ball.oldY = ball.y - ball.vy;
        }
      }
    }

    for (let i = 0; i < collisionPoint.length; i++) {
      const p1 = collisionPoint[i];
      const p2 = collisionPoint[i + 2];

      if (!!p2) {
        if (ball.isRimPassed) {
          const { x, y } = projection(ball, p1, p2);

          const dx = ball.x - x;
          const dy = ball.y - y;
          const dist = Math.hypot(dx, dy);
          const normal = {
            x: dx / dist,
            y: dy / dist,
          };

          if (dist < ball.radius) {
            const normalVector = {
              x: normal.x * ball.radius,
              y: normal.y * ball.radius,
            };

            ball.x = x + normalVector.x;
            ball.y = y + normalVector.y;

            ball.oldX = ball.x - ball.vx;
            ball.oldY = ball.y - ball.vy;
          }
        }
      }
    }
  }

  pedestal(ctx) {
    // left pedestal
    ctx.save();

    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 1;
    ctx.shadowOffsetY = 1;

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.moveTo(this.x, this.y - this.size / 2);
    ctx.lineTo(
      this.x + this.netWidth / 2 - this.rowGap,
      this.y + this.boardHeight - this.boardHeight * 0.25
    );
    ctx.stroke();

    // right pedestal
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.moveTo(this.x + this.netWidth, this.y - this.size / 2);
    ctx.lineTo(
      this.x + this.netWidth - this.netWidth / 2 + this.rowGap,
      this.y + this.boardHeight - this.boardHeight * 0.25
    );
    ctx.stroke();
    ctx.restore();
  }

  draw(ctx) {
    ctx.save();

    ctx.globalAlpha = 0.35;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(
      this.x + this.netWidth / 2 - this.boardWidth / 2,
      this.y,
      this.boardWidth,
      this.boardHeight
    );
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.netWidth, -this.size);
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.padding / 1.3);
    ctx.lineTo(this.x + this.netWidth, this.y - this.padding / 1.3);
    ctx.stroke();
    ctx.restore();
  }
}
