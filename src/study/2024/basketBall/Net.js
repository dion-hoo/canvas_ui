import { Hoop } from "./Hoop.js";
import { getDistance } from "./util.js";

export class Net {
  constructor(x, y, strokeColor) {
    this.x = x;
    this.y = y;
    this.strokeColor = strokeColor;

    this.rowsArray = [];
    this.nets = [];
    this.collisionPoint = [];
    this.scoredPoint = [];
    this.newGap = 0;

    this.totalRow = 9;
    this.maxRows = 6;
    this.minRows = 5;

    for (let i = 0; i < this.totalRow; i++) {
      i % 2 === 0
        ? this.rowsArray.push(this.maxRows)
        : this.rowsArray.push(this.minRows);
    }

    this.rowGap = innerHeight * 0.0164;
    this.columnGap = innerHeight * 0.0043;
    this.netWidth = 0;

    this.initNet();
  }

  initNet() {
    let accY = this.y;

    for (let h = 0; h < this.totalRow; h++) {
      const length = this.rowsArray[h];
      const columnGap = h === 0 ? this.columnGap * 7.9 : this.columnGap;

      for (let w = 0; w < length; w++) {
        const rowGap =
          h === 0
            ? this.rowGap * 1.6
            : h === 2
            ? this.rowGap * 0.83
            : this.rowGap;
        const width = rowGap * length;

        if (h === 0) {
          this.netWidth = rowGap * (length - 1);
        }

        const x = this.x + rowGap * w - width / 2 + rowGap / 2;
        const y = accY + columnGap * h;
        const radius = 1;
        const isFixed = h === 0;

        this.nets.push(new Hoop(isFixed, x, y, radius, this.strokeColor));
      }

      accY += columnGap;
    }
  }

  setNetGap(ball, net) {
    const { distance } = getDistance(ball, net);

    if (distance < ball.radius + net.radius) {
      //   this.newGap = ball.radius;
    } else {
      this.newGap = 0;
    }
  }

  drawLine(ctx, p1, p2) {
    ctx.save();
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = innerHeight * 0.0007;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.restore();
  }

  drawNet(ctx, touch) {
    this.collisionPoint = [];

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

        net.update(1);
        net.move(touch, this.columnGap, 20);
        net.windowRebound();

        const nextLineNet = this.nets[index + 11];
        if ((index % 11 === 0 || index % 11 === 5) && !!nextLineNet) {
          this.drawLine(ctx, net, nextLineNet);

          this.collisionPoint.push(net);

          if (!net.hoopDistance.next) {
            net.hoopDistance.next = getDistance(net, nextLineNet).distance;
          }

          net.constraints(nextLineNet, net.hoopDistance.next);
        }

        if (isSameRow && !isNoConnect) {
          if (cloestColumn) {
            this.drawLine(ctx, net, cloestColumn);

            if (!net.hoopDistance.cloest) {
              net.hoopDistance.cloest = getDistance(net, cloestColumn).distance;
            }

            net.constraints(cloestColumn, net.hoopDistance.cloest);
          }
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
          this.drawLine(ctx, net, cloestColumn);

          if (!net.hoopDistance.inverse) {
            net.hoopDistance.inverse = getDistance(net, cloestColumn).distance;
          }

          net.constraints(cloestColumn, net.hoopDistance.inverse);
        }
      }
    }

    const totalNetLength = this.nets.length - 1;

    const net1 = this.nets[totalNetLength - this.minRows];
    const net2 = this.nets[totalNetLength];

    this.scoredPoint = [net1, net2];
  }

  releaseNet(ball) {
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

        if (ball.isRimPassed) {
          const { distance, dx, dy } = getDistance(ball, net);
          const normal = {
            x: dx / distance,
            y: dy / distance,
          };

          const dot = ball.vx * normal.x + ball.vy * normal.y;

          net.move(ball, this.columnGap * 5, dot);
        }

        const nextLineNet = this.nets[index + 11];
        if ((index % 11 === 0 || index % 11 === 5) && !!nextLineNet) {
          ball.isRimPassed && this.setNetGap(ball, net);

          net.gap = this.newGap;
        }

        if (isSameRow && !isNoConnect) {
          if (cloestColumn) {
            ball.isRimPassed && this.setNetGap(ball, net);

            net.gap = this.newGap;
          }
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
          ball.isRimPassed && ball.isStart && this.setNetGap(ball, net);

          net.gap = this.newGap;
        }
      }
    }
  }
}
