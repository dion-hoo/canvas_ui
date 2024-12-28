import { Net } from "./Net.js";
import { Rim } from "./Rim.js";

export class NetManager {
  constructor(x, y, strokeColor, rimColor) {
    this.x = x;
    this.y = y;
    this.strokeColor = strokeColor;
    this.rimColor = rimColor;

    this.net = new Net(x, y, strokeColor);

    const padding = 6;
    const extraWidth = 6;
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

  moveMoment(angleValue) {
    this.angle += angleValue;

    this.rim.x += Math.sin(this.initAngle + this.angle);

    this.rim.collsitionTopPoint.forEach((point) => {
      point.x += Math.sin(this.initAngle + this.angle);
    });

    this.net.nets.forEach((net, index) => {
      if (index < 6) {
        net.x += Math.sin(this.initAngle + this.angle);
      }
    });
  }

  draw(ctx, ball, touch, isRmPassed) {
    // 농구 림
    this.rim.draw(ctx);

    this.net.drawNet(ctx, ball, touch, isRmPassed);
    this.rim.collision(ball, this.net.collisionPoint);
  }
}
