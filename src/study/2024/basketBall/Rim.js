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

    const sideSize = 30;
    this.addCollsitionPoint = [
      { x: this.x + sideSize, y: this.y },
      { x: this.x + this.netWidth - sideSize, y: this.y },
    ];
  }

  collision(ctx, collisionPoint, ball) {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 10;

    const point = [...this.addCollsitionPoint, ...collisionPoint];

    ctx.beginPath();
    for (let i = 0; i < point.length; i++) {
      const p1 = point[i];
      const p2 = point[i + 2];

      if (!!p2) {
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

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

            const damping = 0.89;
            ball.vx *= damping;
            ball.vy *= damping;

            ball.x = x + normalVector.x;
            ball.y = y + normalVector.y;

            ball.oldX = ball.x - ball.vx;
            ball.oldY = ball.y - ball.vy;
          }
        }
      }
    }
    ctx.stroke();
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
