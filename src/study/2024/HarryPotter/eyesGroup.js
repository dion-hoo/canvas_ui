import { Eyes } from "./eyes.js";

export class EyesGroup {
  constructor(total) {
    this.eyesList = [];

    for (let i = 0; i < total; i++) {
      const posX = (innerWidth / (total + 1)) * (i + 1);
      const eyes = [];
      const length = Math.random() * 9 + 5;
      const radius = Math.random() * 15 + 10;

      for (let j = 0; j < length; j++) {
        const x = posX;
        const y = radius - j * (radius / 1.3);
        const isFixed = j === 0;

        eyes.push(new Eyes(isFixed, x, y, radius));
      }

      this.eyesList.push(eyes);
    }
  }

  draw(ctx, mouse) {
    this.eyesList.forEach((eyes) => {
      eyes.forEach((e) => {
        e.update(1);
        e.constraints(eyes);
        e.move(mouse);
        e.draw(ctx);
      });
    });
  }
}
