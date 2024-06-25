export class Point {
  constructor(order, font, x, y, radius) {
    this.order = order;
    this.font = font;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.4;
    this.elastic = 0.09;
    this.radius = radius;
    this.isDrag = false;
    this.index = 0;
    this.isArrived = false;
  }

  updatePosition(prevX, prevY, prevRadius, px, py, radius, elastic) {
    const tx = prevX - px;
    const ty = prevY - py;
    const tDistance = Math.sqrt(tx * tx + ty * ty);
    let vx = 0;
    let vy = 0;

    if (tDistance > prevRadius + radius) {
      vx = tx * elastic;
      vy = ty * elastic;
    }

    return {
      vx,
      vy,
    };
  }

  display() {
    const boundary = innerHeight * 0.48;

    if (this.y >= boundary - 2) {
      this.isArrived = true;
    }

    if (this.y < boundary - 2 && !this.isArrived && !this.isDrag) {
      this.vy = ((boundary - this.y) * 0.2) / (this.order + 1);

      this.y += this.vy;
    }
  }

  update(point, mouse) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius) {
      this.isDrag = true;
    }

    if (this.isDrag) {
      let prevX = this.x;
      let prevY = this.y;
      let prevRadius = this.radius;

      for (let i = this.index; i < point.length; i++) {
        const p = point[i];

        if (this === p) {
          this.index = i;

          this.vx = (mouse.x - this.x) * this.friction;
          this.vy = (mouse.y - this.y) * this.friction;

          this.x += this.vx;
          this.y += this.vy;
        } else {
          const { vx, vy } = this.updatePosition(
            prevX,
            prevY,
            prevRadius,
            p.x,
            p.y,
            p.radius,
            p.elastic
          );

          p.x += vx;
          p.y += vy;
        }

        prevX = point[i].x;
        prevY = point[i].y;
        prevRadius = point[i].radius;
      }

      let prevX2 = point[this.index].x;
      let prevY2 = point[this.index].y;
      let prevRadius2 = point[this.index].radius;

      for (let j = this.index; j >= 0; j--) {
        const p = point[j];

        const { vx, vy } = this.updatePosition(
          prevX2,
          prevY2,
          prevRadius2,
          p.x,
          p.y,
          p.radius,
          p.elastic
        );

        p.x += vx;
        p.y += vy;

        prevX2 = point[j].x;
        prevY2 = point[j].y;
        prevRadius2 = point[j].radius;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#323232";
    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.stroke();

    ctx.fillText(this.font, this.x, this.y);
    ctx.closePath();
  }
}
