export class Point {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.image = new Image();
    this.image.src = "../../../assets/img/image01.png";
  }

  draw(ctx) {
    const startX = innerWidth * 0.5;
    const startY = innerHeight * 0.5;

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(startX, startY, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    const dx = this.x - startX;
    const dy = this.y - startY;
    const defaultRadian = (90 * Math.PI) / 180;
    const radian = defaultRadian + Math.atan2(dy, dx);

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(radian);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.clip();

    if (this.image) {
      const width = this.radius * 2;
      const height = this.radius * 2;

      ctx.drawImage(this.image, -width / 2, -height / 2, width, height);
    }

    ctx.restore();
  }
}
