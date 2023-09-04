import { Back } from "./Back.js";

export class Dot {
  constructor(x, y, width, height, frontImage, backImage) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.edge = 80;
    this.ground = false;

    this.frontImage = frontImage;
    this.backImage = backImage;

    this.back = new Back(
      this.x,
      this.y,
      this.width,
      this.height,
      this.backImage
    );

    // vertex move x, y
    this.moveX0 = 0;
    this.moveY0 = 0;

    this.moveX1 = 0;
    this.moveY1 = 0;

    this.moveX2 = 0;
    this.moveY2 = 0;

    this.moveX3 = 0;
    this.moveY3 = 0;

    this.moveX4 = 0;
    this.moveY4 = 0;

    this.moveX5 = 0;
    this.moveY5 = 0;

    this.moveX6 = 0;
    this.moveY6 = 0;

    this.moveX7 = 0;
    this.moveY7 = 0;
  }

  draw(ctx, moveX, moveY) {
    const FORCE = 3.5;
    const vertex = [
      { x: this.x + this.moveX0, y: this.y + this.moveY0 },
      {
        x: this.x + this.width - this.edge + this.moveX1,
        y: this.y + this.moveY1,
      },
      {
        x: this.x + this.width - this.edge * 0.77 + this.moveX2,
        y: this.y + this.edge / 2 + this.moveY2,
      },
      {
        x: this.x + this.width - this.edge + 20 + this.moveX3,
        y: this.y + this.edge + 10 + this.moveY3,
      },
      {
        x: this.x + this.width - this.edge * 0.7 + this.moveX4,
        y: this.y + this.edge * 0.6 + this.moveY4,
      },
      {
        x: this.x + this.width + this.moveX5,
        y: this.y + this.edge + this.moveY5,
        overY: false,
      },
      {
        x: this.x + this.width + this.moveX6,
        y: this.y + this.height + this.moveY6,
      },
      { x: this.x + this.moveX7, y: this.y + this.height + this.moveY7 },
    ];

    this.moveX2 += moveX * FORCE;

    this.moveX3 += moveX * FORCE;
    this.moveY3 += moveY * FORCE;

    if (vertex[1].x <= this.x) {
      this.moveY0 += moveY * FORCE;
      this.moveY1 += moveY * FORCE;
      this.moveY2 += moveY * FORCE;
    } else {
      this.moveX1 += moveX * FORCE;
    }

    if (vertex[5].y >= this.y + this.height) {
      this.moveX4 += moveX * FORCE;
      this.moveY4 += moveY * FORCE;

      this.moveX5 += moveX * FORCE;
      this.moveY5 += moveY * FORCE;

      vertex[5].overY = true;

      const slope = (vertex[5].x - vertex[1].x) / (vertex[5].y - vertex[1].y);

      // vertex[6].x = tx;
      this.moveX6 += moveX * FORCE;
      // vertex[6].x *= slope;
    } else {
      this.moveY4 += moveY * FORCE;
      this.moveY5 += moveY * FORCE;
    }

    if (vertex[6].x <= this.x) {
      this.moveY6 += moveY * FORCE;

      this.moveX7 += moveX * FORCE;
      this.moveY7 += moveY * FORCE;
    }

    if (vertex[0].y >= this.y + this.height) {
      this.moveX7 += moveX * FORCE;
      this.moveY7 += moveY * FORCE;
    }

    // if (vertex[1].x <= this.x && vertex[1].y >= this.y + this.height) {
    //   const gravity = 3;
    //   this.moveY0 += gravity;
    //   this.moveY1 += gravity;
    //   this.moveY2 += gravity;
    //   this.moveY3 += gravity;
    //   this.moveY4 += gravity;
    //   this.moveY5 += gravity;
    //   this.moveY6 += gravity;
    //   this.moveY7 += gravity;

    //   if (vertex[1].y >= innerHeight) {
    //     this.ground = true;
    //   }
    // }

    ctx.save();
    ctx.beginPath();

    for (let v = 0; v < vertex.length; v++) {
      const { x, y } = vertex[v];

      if (v === 0) {
        ctx.moveTo(vertex[0].x, vertex[0].y);
      } else {
        if (v === 2 || v === 4) {
          ctx.quadraticCurveTo(x, y, vertex[v + 1].x, vertex[v + 1].y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(this.frontImage, this.x, this.y, this.width, this.height);
    ctx.restore();

    this.back.update(vertex[1], vertex[2], vertex[3], vertex[4], vertex[5]);
    this.back.draw(ctx);

    // ctx.beginPath();
    // for (let v = 0; v < vertex.length; v++) {
    //   const { x, y } = vertex[v];

    //   ctx.fillStyle = "red";
    //   ctx.arc(x, y, 5, 0, Math.PI * 2);
    //   ctx.fill();
    //   ctx.closePath();
    // }

    return this.ground;
  }
}
