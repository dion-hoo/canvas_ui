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
      this.rimColor
    );
  }

  drawRimPedestal(ctx) {
    this.rim.pedestal(ctx);
  }

  draw(ctx, ball, touch, isRmPassed) {
    // 농구 림
    this.rim.drawRimArea(ctx);
    this.rim.draw(ctx);

    this.net.drawNet(ctx, ball, touch, isRmPassed);
  }
}
