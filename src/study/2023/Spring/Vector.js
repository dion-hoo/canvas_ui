export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;

    return {
      x: this.x,
      y: this.y,
    };
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;

    return {
      x: this.x,
      y: this.y,
    };
  }

  mult(n) {
    this.x *= n;
    this.y *= n;

    return {
      x: this.x,
      y: this.y,
    };
  }

  div(n) {
    this.x /= n;
    this.y /= n;

    return {
      x: this.x,
      y: this.y,
    };
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y + this.y);
  }

  normalize() {
    const m = this.mag();

    return this.div(m);
  }
}
