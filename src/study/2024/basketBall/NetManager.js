import { Net } from "./Net.js";
import { Rim } from "./Rim.js";

export class NetManager {
  constructor(x, y, strokeColor, rimColor) {
    this.x = x;
    this.y = y;
    this.strokeColor = strokeColor;
    this.rimColor = rimColor;

    this.net = new Net(x, y, strokeColor);

    const padding = innerHeight * 0.0043;
    const extraWidth = innerHeight * 0.0043;
    const rimX = this.net.x - this.net.netWidth / 2 - extraWidth;
    const rimY = this.net.y;

    this.rim = new Rim(
      rimX,
      rimY,
      padding,
      this.net.netWidth + extraWidth * 2,
      this.net.rowGap,
      this.net.columnGap,
      this.rimColor
    );

    this.initAngle = Math.random() * 360;
    this.angle = 0;
  }

  drawRimPedestal(ctx) {
    this.rim.pedestal(ctx);
  }

  moveMoment(angleValue, isRoundMove) {
    this.angle += angleValue;

    if (isRoundMove) {
      this.rim.y += Math.cos(this.initAngle + this.angle);
    }

    this.rim.x += Math.sin(this.initAngle + this.angle);

    this.rim.collsitionTopPoint.forEach((point) => {
      if (isRoundMove) {
        point.y += Math.cos(this.initAngle + this.angle);
      }

      point.x += Math.sin(this.initAngle + this.angle);
    });

    this.net.nets.forEach((net, index) => {
      if (index < 6) {
        if (isRoundMove) {
          net.y += Math.cos(this.initAngle + this.angle);
        }

        net.x += Math.sin(this.initAngle + this.angle);
      }
    });
  }

  draw(ctx, ball, touch) {
    this.rim.draw(ctx);
    this.net.drawNet(ctx, touch);

    ball.forEach((b) => {
      if (b.isStart) {
        this.net.releaseNet(b);
        this.rim.collision(b, this.net.collisionPoint, this.net.scoredPoint);
      }
    });
  }
}
