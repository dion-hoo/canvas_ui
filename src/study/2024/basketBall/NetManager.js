import { Net } from "./Net.js";
import { Rim } from "./Rim.js";

export class NetManager {
  constructor(x, y, rimColor) {
    this.x = x;
    this.y = y;
    this.rimColor = rimColor;

    this.net = new Net(x, y);

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
    this.net.drawNet(ctx, ball, touch, isRmPassed);

    // 농구 림
    this.rim.draw(ctx);
  }
}
