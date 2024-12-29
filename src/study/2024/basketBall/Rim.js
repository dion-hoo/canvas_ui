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
    this.size = innerHeight * 0.0071;

    this.boardWidth = innerHeight * 0.0426;
    this.boardHeight = innerHeight * 0.0213;

    const sideSize = innerHeight * 0.0142;
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

  collision(ball, collisionPoint, scoredPoint) {
    const p1 = scoredPoint[0];
    const p2 = scoredPoint[1];

    const { x, y } = projection(ball, p1, p2);

    const dx = x - ball.x;
    const dy = y - ball.y;
    const dist = Math.hypot(dx, dy);

    if (dist <= ball.radius && ball.isRimPassed && !ball.isScored) {
      ball.score += 1;
      ball.isScored = true;
    }

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

    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = innerHeight * 0.0007;
    ctx.shadowOffsetY = innerHeight * 0.0007;

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = innerHeight * 0.0036;
    ctx.moveTo(this.x, this.y - this.size / 2);
    ctx.lineTo(
      this.x + this.netWidth / 2 - this.rowGap,
      this.y + this.boardHeight - this.boardHeight * 0.25
    );
    ctx.stroke();

    // right pedestal
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = innerHeight * 0.0036;
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

    ctx.globalAlpha = 0.6;

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

    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.padding / 1.3);
    ctx.lineTo(this.x + this.netWidth, this.y - this.padding / 1.3);
    ctx.stroke();
    ctx.restore();
  }
}
