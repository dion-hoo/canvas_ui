export class Spring {
  constructor(restLegnth, p1, p2) {
    this.restLegnth = restLegnth;
    this.p1 = p1;
    this.p2 = p2;
  }

  update(ctx) {
    const K = 0.09;
    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const x = distance - this.restLegnth;

    const normalize = {
      x: dx / distance,
      y: dy / distance,
    };

    const springForce = {
      x: normalize.x * x,
      y: normalize.y * x,
    };

    const force = {
      x: -K * springForce.x,
      y: -K * springForce.y,
    };

    this.p2.update(force);

    force.x *= -1;
    force.y *= -1;

    this.p1.update(force);

    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.closePath();
  }
}
