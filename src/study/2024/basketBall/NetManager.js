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
    const rimX = this.net.x - this.net.netWidth / 2 + this.net.rowGap / 2;
    const rimY = this.net.y;

    this.rim = new Rim(
      rimX,
      rimY,
      padding,
      this.net.netWidth,
      this.net.rowGap,
      this.rimColor
    );
  }

  draw(ctx, ball, touch, isRmPassed) {
    // 농구 림
    this.rim.drawRimArea(ctx);
    this.rim.draw(ctx);

    this.net.drawNet(ctx, ball, touch, isRmPassed);
  }
}
