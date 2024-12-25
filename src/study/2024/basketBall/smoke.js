export class Smoke {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    const radianX = Math.random() * ((180 * Math.PI) / 180);
    const radisnY = Math.random() * ((180 * Math.PI) / 180);

    this.target = {
      x: innerWidth * 0.5 + Math.cos(radianX) * innerWidth * 0.5,
      y: innerHeight * 0.5 + Math.sin(radisnY) * -innerHeight,
    };

    const initDx = this.target.x - this.x;
    const initDy = this.target.y - this.y;
    const initDist = Math.sqrt(initDx * initDx + initDy * initDy);

    this.initDist = initDist;
    this.dist = 0;
    this.normal = { x: 0, y: 0 };

    this.rotate = Math.random() * Math.PI * 2;
    this.rotateDirection = Math.random() > 0.5 ? 1 : -1;

    this.image = new Image();
    this.image.src = "./smoke.png";
    this.isLoaded = false;

    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.isEnd = false;
  }

  move() {
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    this.dist = Math.sqrt(dx * dx + dy * dy);

    this.normal = {
      x: dx / this.dist,
      y: dy / this.dist,
    };

    const force = this.dist * 0.006;

    this.x += force * this.normal.x;
    this.y += force * this.normal.y;
  }

  moveMouse(mouse) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < this.radius) {
      const normal = {
        x: dx / dist,
        y: dy / dist,
      };

      const force = 100;

      this.x += force * normal.x;
      this.y += force * normal.y;
    }
  }

  map(value, start1, stop1, start2, stop2, withinBounds) {
    const newValue =
      start2 + ((value - start1) * (stop2 - start2)) / (stop1 - start1);

    if (withinBounds) {
      if (stop2 > start2) {
        return this.constrain(newValue, start2, stop2);
      } else {
        return this.constrain(newValue, stop2, start2);
      }
    }

    return newValue;
  }

  constrain(value, low, high) {
    return Math.max(Math.min(value, high), low);
  }

  draw(ctx) {
    ctx.save();

    const opacity = this.map(this.dist, this.initDist, 0, 0.3, 0);

    if (opacity < 0.1) {
      this.isEnd = true;
    }

    ctx.globalAlpha = opacity;

    ctx.translate(this.x, this.y);

    ctx.rotate(this.rotate);

    this.rotate += 0.01 * this.rotateDirection;

    if (this.isLoaded) {
      ctx.drawImage(
        this.image,
        -this.radius / 2,
        -this.radius / 2,
        this.radius * 2,
        this.radius * 2
      );
    }
    ctx.restore();
  }
}
