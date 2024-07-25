export class Circle {
  constructor(index, x, y, radius) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.vy = 0;
    this.radius = radius;
    this.angle = Math.random() * 180;
    this.maxHeight = 100;
  }

  slideUp() {
    this.vy += 0.4;

    if (this.fixedY > innerHeight * 0.7) {
      this.fixedY -= this.vy;
    }
  }

  update() {
    this.angle += 1.2;
    const angle = this.index + (this.angle * Math.PI) / 180;

    this.y = this.fixedY + Math.sin(angle) * this.maxHeight;
  }
}
