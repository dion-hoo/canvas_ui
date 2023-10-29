export class Apeture {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.line = 100;
    this.space = 20;
    this.height = 20;
    this.position = -((this.line / 2) * this.space);
  }

  draw(ctx, moveX) {
    this.position += moveX * 0.9999;

    if (this.position > 0) {
      this.position = 0;
    }
    if (this.line * this.space < Math.abs(this.position)) {
      this.position = -this.line * this.space;
    }

    ctx.save();
    ctx.translate(this.position, 0);

    // 직선 그리기
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";
    ctx.font = "20px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseLine = "middle";

    for (let i = 0; i <= this.line; i++) {
      ctx.beginPath();
      ctx.lineWidth = i % 2 === 0 ? 3 : 1;
      const half = this.line / 2;

      if (i === half) {
        ctx.fillText(0, this.x + i * this.space, this.y - 10);
      } else {
        if (i % 5 === 0) {
          ctx.fillText(
            Math.abs(half - i) / 5,
            this.x + i * this.space,
            this.y - 10
          );
        }
      }

      ctx.moveTo(this.x + i * this.space, this.y);
      ctx.lineTo(this.x + i * this.space, this.y + this.height);

      ctx.stroke();
      ctx.closePath();
    }

    ctx.restore();
  }
}
