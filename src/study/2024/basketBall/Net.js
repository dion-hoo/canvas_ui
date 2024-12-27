import { Point } from "./Point.js";
import { Rim } from "./Rim.js";

export class Net extends Point {
  constructor(isFixed, x, y, raidus) {
    super(isFixed, x, y, raidus, "#000");

    this.rowsArray = [];
    this.nets = [];

    this.totalRow = 9;
    this.maxRows = 6;
    this.minRows = 5;

    for (let i = 0; i < this.totalRow; i++) {
      i % 2 === 0
        ? this.rowsArray.push(this.maxRows)
        : this.rowsArray.push(this.minRows);
    }

    this.rowGap = 28;
    this.columnGap = 9;
    this.netWidth = 0;
    this.netDistance = {
      cloest: null,
      next: null,
      inverse: null,
    };

    this.rim = null;
  }

  init(positionX, positionY, rimColor) {
    this.x = positionX;
    this.y = positionY;

    let accY = positionY;

    for (let h = 0; h < this.totalRow; h++) {
      const length = this.rowsArray[h];
      const columnGap = h === 0 ? this.columnGap * 10 : this.columnGap;

      for (let w = 0; w < length; w++) {
        const rowGap = h === 0 ? this.rowGap * 1.9 : this.rowGap;
        const width = rowGap * length;

        if (h === 0) {
          this.netWidth = rowGap * length;
        }

        const x = this.x + rowGap * w - width / 2 + rowGap / 2;
        const y = accY + columnGap * h;
        const radius = 1;
        const isFixed = h === 0;

        this.nets.push(new Net(isFixed, x, y, radius, this.color));
      }

      accY += columnGap;
    }

    this.initRim(rimColor);
  }

  initRim(rimColor) {
    const padding = 6;
    const rimX = this.x - this.netWidth / 2 + this.rowGap / 2;
    const rimY = this.y;

    this.rim = new Rim(
      rimX,
      rimY,
      padding,
      this.netWidth,
      this.rowGap,
      rimColor
    );
  }

  getDistance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.hypot(dx, dy);

    return distance;
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
        const cloestColumn = this.nets[index + this.maxRows];

        const even = y % 2 === 0;
        const lastItem = x === totalRows - 1;
        const isNoConnect = even && lastItem;

        if (isPass) {
          net.move(ball, this.columnGap);
          net.resist(ball);
        }

        net.update(1);

        net.move(touch, this.columnGap);
        net.windowBounce();

        if (y !== 0) {
          net.draw(ctx);
        }

        const nextLineNet = this.nets[index + 11];
        if ((index % 11 === 0 || index % 11 === 5) && !!nextLineNet) {
          if (!net.netDistance.next) {
            net.netDistance.next = this.getDistance(net, nextLineNet);
          }

          net.constraints(ctx, nextLineNet, net.netDistance.next);
        }

        if (isSameRow && !isNoConnect) {
          if (cloestColumn) {
            if (!net.netDistance.cloest) {
              net.netDistance.cloest = this.getDistance(net, cloestColumn);
            }

            net.constraints(ctx, cloestColumn, net.netDistance.cloest);
          }
        }

        // 마지막 줄줄
        const nextNets = this.nets[index + 1];
        if (y === this.totalRow - 1 && !!nextNets) {
          net.constraints(ctx, nextNets, this.rowGap, false);
        }
      }

      // 역순으로 순회
      for (let invX = endIndex; invX >= startIndex; invX--) {
        const net = this.nets[invX];
        const even = y % 2 === 0;
        const lastItem = invX === startIndex;
        const isNoConnect = even && lastItem;
        const cloestColumn = this.nets[invX + this.minRows];

        if (!net) continue;

        if (cloestColumn && !isNoConnect) {
          if (!net.netDistance.inverse) {
            net.netDistance.inverse = this.getDistance(net, cloestColumn);
          }

          net.constraints(ctx, cloestColumn, net.netDistance.inverse);
        }
      }
    }

    // 농구 림
    // this.rim.draw(ctx);
  }
}
