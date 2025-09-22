import { getDistance } from "./utils.js";

export class Tile {
  constructor(index, cols, x, y, size) {
    this.index = index;
    this.cols = cols;

    this.x = x;
    this.y = y;
    this.size = size;

    this.progress = 0;
    this.speed = 0.08;
    this.isMoving = false;
    this.isFinish = false;

    this.up = null;

    this.setPosition();
  }

  getRow() {
    return Math.floor(this.index / this.cols);
  }

  getCol() {
    return this.index % this.cols;
  }

  getNeighborsIndices() {
    const row = this.getRow();
    const col = this.getCol();
    const last = this.cols - 1;

    const up = row > 0 ? this.index - this.cols : null;
    const down = row < last ? this.index + this.cols : null;
    const left = col > 0 ? this.index - 1 : null;
    const right = col < last ? this.index + 1 : null;

    return { up, down, left, right };
  }

  setPosition(direction = 1) {
    this.centerX = this.x + this.size / 2;
    this.centerY = this.y + this.size / 2;

    this.startY = this.y;
    this.endY = this.startY - this.size * direction;
  }

  updatePosition(tiles, mouse) {
    const { distance } = getDistance(
      this.centerX,
      this.centerY,
      mouse.x,
      mouse.y
    );
    const minDistance = this.size * 0.5;

    if (distance < minDistance && !this.isMoving) {
      const { up } = this.getNeighborsIndices();

      this.up = up;

      this.isMoving = true;
    }

    if (this.up && !this.isFinish) {
      this.moving();

      tiles[this.up].isMoving = true;
      tiles[this.up].setPosition(-1);
      tiles[this.up].moving(-1);
    }
  }

  moving(direction = 1) {
    this.progress = Math.min(1, this.progress + this.speed);
    this.y = this.startY + (this.endY - this.startY) * this.progress;

    if (this.progress >= 1) {
      this.progress = 0;
      this.isFinish = true;

      this.setPosition(direction);
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#1c9";
    ctx.strokeStyle = "#000";
    ctx.beginPath();

    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.strokeRect(this.x, this.y, this.size, this.size);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}
