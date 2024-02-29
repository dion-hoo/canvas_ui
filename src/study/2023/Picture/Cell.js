export class Cell {
  constructor(effect, x, y, image, index, imageObj) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = this.effect.cellWidth;
    this.height = this.effect.cellHeight;

    this.positionX = imageObj.positionX;
    this.positionY = imageObj.positionY;
    this.speedX = imageObj.speedX;
    this.speedY = imageObj.speedY;

    this.posX = 0;
    this.posY = 0;

    this.ease = 0.1;
    this.friction = 0.98;

    this.index = index;

    this.direction =
      imageObj.direction === 0
        ? Math.random() > 0.5
          ? 1
          : -1
        : imageObj.direction;

    this.randomX = Math.random() * 3 + 4;
    this.randomY = Math.random() * 3 + 4;

    this.randomX2 = Math.random() * 10 + 25;
    this.randomY2 = Math.random() * 10 + 25;
  }

  update(mouse, centerX, centerY, isSeperate) {
    // crop
    const dx = mouse.x - (this.x + centerX);
    const dy = mouse.y - (this.y + centerY);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mouse.radius) {
      const angle = Math.atan2(dy, dx);

      this.posX -= Math.cos(angle) * this.randomX;
      this.posY -= Math.sin(angle) * this.randomY;
    }

    this.isSeperate = isSeperate;

    if (isSeperate) {
      const cx = innerWidth * 0.5 - (this.x + centerX);
      const cy = innerHeight * 0.5 - (this.y + centerY);

      const angle = Math.atan2(cy, cx);

      this.posX -= Math.cos(angle) * this.randomX2;
      this.posY -= Math.sin(angle) * this.randomY2;
    }
  }

  draw(ctx, timestamp, isClick) {
    ctx.save();

    const angleOftime = timestamp / (this.index * 0.0001);
    const a = this.isSeperate
      ? angleOftime
      : angleOftime >= 360
      ? 360
      : angleOftime;
    const angle = (a * Math.PI) / 180;

    ctx.translate(this.x + this.posX, this.y + this.posY);

    ctx.rotate(this.direction * angle);

    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    );

    // ctx.strokeStyle = "#000";
    // ctx.strokeRect(0, 0, this.width, this.height);

    ctx.restore();
  }
}
