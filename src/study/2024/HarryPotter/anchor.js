export class Anchor {
  constructor(x, y, sides, size) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.vy = 0;
    this.sides = sides;
    this.size = size;
    this.color = "#fff";
    this.angle = 0;

    const angle = 360 / sides;
    const radian = (angle * Math.PI) / 180;

    this.image = new Image();
    this.image.src = "";
    this.width = 0;

    this.point = [];

    for (let i = 0; i < this.sides; i++) {
      let size = this.size;
      if (i === 0) {
        size = this.size * 1.3;
      }

      const x = Math.cos(radian * i) * size;
      const y = Math.sin(radian * i) * size;

      this.point.push({
        x,
        y,
      });
    }
  }

  update(color) {
    this.color = color;
  }

  draw(ctx, mouse) {
    ctx.save();
    ctx.fillStyle = this.color;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const radian = Math.atan2(dy, dx);

    this.angle += 0.09;

    ctx.translate(
      this.x + Math.cos(this.angle) * 10,
      this.y + Math.sin(-this.angle) * 10
    );

    ctx.scale(0.7, 0.7);

    if (mouse.isDown) {
      ctx.rotate(radian);
    }

    ctx.beginPath();
    for (let i = 0; i < this.point.length; i++) {
      const p = this.point[i];

      if (i === 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.lineTo(this.point[0].x, this.point[0].y);

    // ctx.fill();
    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.font = `500 ${80}px harry`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.beginPath();

    // 891, 1458
    // 100

    const width = this.size * this.width;
    const height = this.size;

    ctx.beginPath();
    ctx.drawImage(this.image, -width / 2, -height / 2, width, height);
    ctx.closePath();

    ctx.restore();
  }
}
