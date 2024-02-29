import { Cell } from "./Cell.js";

export class Effect {
  constructor(canvas, imageObj) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 80;
    this.cellHeight = this.height / 30;

    this.imageObj = imageObj;
    this.image = document.querySelector(`.${imageObj.image}`);
    this.video = document.querySelector(".video");

    this.imageGrid = [];

    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth) {
        this.imageGrid.push(new Cell(this, x, y, this.image, x + y, imageObj));
      }
    }

    this.isSeperate = false;
    setTimeout(() => {
      this.isSeperate = imageObj.isSeperate;
    }, 1200);

    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 100,
    };

    this.canvas.addEventListener("pointermove", (e) => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
    });

    this.canvas.addEventListener("pointerleave", (e) => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }

  draw(ctx, timestamp, centerX, centerY, isClick) {
    this.imageGrid.forEach((cell) => {
      cell.update(this.mouse, centerX, centerY, this.isSeperate);
      cell.draw(ctx, timestamp, isClick);
    });
  }
}
