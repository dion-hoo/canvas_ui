export class Spring {
  constructor(k, restLength, p1, p2, hsl) {
    this.k = k;
    this.restLength = restLength;
    this.p1 = p1;
    this.p2 = p2;
    this.hsl = hsl;
  }

  update() {
    const force = {
      x: this.p2.x - this.p1.x,
      y: this.p2.y - this.p1.y,
    };
    const distance = Math.sqrt(force.x * force.x + force.y * force.y);
    const x = distance - this.restLength;

    const normalize = {
      x: force.x / distance,
      y: force.y / distance,
    };

    const springFroce = {
      x: this.k * normalize.x * x,
      y: this.k * normalize.y * x,
    };

    this.p1.update(springFroce);

    springFroce.x *= -1;
    springFroce.y *= -1;

    this.p2.update(springFroce);
  }

  draw(ctx) {
    ctx.strokeStyle = `hsl(${this.hsl}, 60%, 50%)`;
    ctx.beginPath();

    ctx.moveTo(this.p1.x, this.p1.y);

    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();

    ctx.closePath();
  }
}
