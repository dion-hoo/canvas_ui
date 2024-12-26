import { Point } from "./Point.js";
import { Rim } from "./Rim.js";

export class Net extends Point {
  constructor(isFixed, x, y, raidus, color) {
    super(isFixed, x, y, raidus, color);

    this.maxRow = 7;
    this.minRow = 6;

    this.rowsArray = [
      this.maxRow,
      this.minRow,
      this.maxRow,
      this.minRow,
      this.maxRow,
      this.minRow,
      this.maxRow,
      this.minRow,
    ];
    this.totalRow = 7;
    this.nets = [];

    this.netGap = 30;
    this.netHalfGap = this.netGap / 2;
    this.collumnGap = Math.hypot(this.netGap, this.netHalfGap);

    this.positionX = 0;
    this.positionY = 0;
    this.width = 0;

    this.rim = null;
  }

  init(positionX, positionY, rimColor) {
    this.positionX = positionX;
    this.positionY = positionY;

    for (let h = 0; h < this.totalRow; h++) {
      const length = this.rowsArray[h];

      for (let w = 0; w < length; w++) {
        this.width = this.netGap * length;

        const x = positionX - this.width / 2 + this.netGap * w;
        const y = positionY + this.netGap * h;
        const radius = 1;
        const isFixed = h === 0;

        this.nets.push(new Net(isFixed, x, y, radius, this.color));
      }
    }

    const rimX = this.positionX - this.width / 2;
    const rimY = this.positionY;

    this.rim = new Rim(rimX, rimY, this.width, this.netGap, rimColor);
  }

  drawNet(ctx, ball, touch, isPass) {
    for (let y = 0; y < this.totalRow; y++) {
      const totalRows = this.rowsArray[y];
      const startIndex = this.rowsArray
        .slice(0, y)
        .reduce((sum, val) => sum + val, 0);
      const endIndex = startIndex + totalRows - 1;
      const length = totalRows + startIndex;

      for (let x = 0; x < totalRows; x++) {
        const index = startIndex + x;

        const net = this.nets[index];
        const isSameRow = index < length;
        const cloestColumn = this.nets[index + this.maxRow];

        const even = y % 2 === 0;
        const lastItem = x === totalRows - 1;
        const isNoDraw = even && lastItem;

        if (isPass) {
          net.move(ball, this.netGap);
          net.resist(ball);
        }

        net.update(1);

        net.move(touch, this.netGap);
        net.windowBounce();

        if (isSameRow && !isNoDraw) {
          if (cloestColumn) {
            net.constraints(ctx, cloestColumn, this.collumnGap);
          }
        }
      }

      // 역순으로 순회
      for (let invX = endIndex; invX >= startIndex; invX--) {
        const net = this.nets[invX];
        const even = y % 2 === 0;
        const lastItem = invX === startIndex;
        const isNoDraw = even && lastItem;

        if (!net) continue;

        const cloestColumn = this.nets[invX + this.minRow];

        if (cloestColumn && !isNoDraw) {
          net.constraints(ctx, cloestColumn, this.collumnGap);
        }
      }
    }

    // 농구 림
    this.rim.draw(ctx);
  }
}
