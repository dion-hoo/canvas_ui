import { Raycasting } from "./Raycasting.js";
import { StackSnow } from "./stackSnow.js";

export class Snow {
  constructor(x, y, radius) {
    this.x = x;
    this.fixedX = x;
    this.y = y;
    this.mass = 3;
    this.radius = radius;
    this.inside = false;

    this.angle = (Math.random() * 360 * Math.PI) / 180;
    this.aVelocity = 0.01;
    this.amplitude = Math.random() * 50 + 50;

    this.stackSnow;
  }

  update(line) {
    const point = {
      x: this.x,
      y: this.y,
    };
    const raycasting = new Raycasting(point, line);

    const isInside = raycasting.update();

    if (isInside && !this.inside) {
      this.stackSnow = new StackSnow(this.x, this.y, this.radius);

      this.inside = true;
      //this.radius = 0;
    } else {
      if (this.inside) {
        setTimeout(() => {
          this.y += this.mass;

          this.stackSnow.update(this.x, this.y);
        }, 6000);
      } else {
        this.angle += this.aVelocity;

        this.x = this.fixedX + Math.sin(this.angle) * this.amplitude;
        this.y += this.mass;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "#fff";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    if (this.inside) {
      this.stackSnow.draw(ctx);
    }
  }
}
