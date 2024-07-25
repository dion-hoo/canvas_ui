const force = {
  x: 0,
  y: 10,
};

export class Point {
  constructor(x, y, radius, image, imageSize) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.image = image;
    this.imageSize = imageSize;
    this.mass = 100;
  }

  update(dt) {
    this.vx = this.x - this.oldX;
    this.vy = this.y - this.oldY;

    this.oldX = this.x;
    this.oldY = this.y;

    const ax = force.x / this.mass;
    const ay = force.y / this.mass;

    this.x += this.vx + ax * dt * dt;
    this.y += this.vy + ay * dt * dt;

    if (this.x < this.radius) {
      this.x = this.radius;

      this.vx = 0;
      this.vy = 0;
    }

    if (this.x > innerWidth - this.radius) {
      this.x = innerWidth - this.radius;

      this.vx = 0;
      this.vy = 0;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.oldY = this.y + this.vy;
    }

    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;
      this.oldY = this.y + this.vy;
    }
  }

  checkCollision(point) {
    for (let i = 0; i < point.length; i++) {
      const p = point[i];

      if (this === p) {
        continue;
      }

      const dx = p.x - this.x;
      const dy = p.y - this.y;
      const distance = dx * dx + dy * dy;
      const minDistance = (this.radius + p.radius) * (this.radius + p.radius);
      const dist = Math.sqrt(distance);

      if (distance < minDistance) {
        const normalized = {
          x: dx / dist,
          y: dy / dist,
        };

        const overlap = this.radius + p.radius - dist;

        this.x -= normalized.x * (overlap / 2);
        this.y -= normalized.y * (overlap / 2);

        p.x += normalized.x * (overlap / 2);
        p.y += normalized.y * (overlap / 2);
      }
    }
  }

  getY(x, dots) {
    for (let i = 1; i < dots.length; i++) {
      if (dots[i].x1 <= x && x <= dots[i].x3) {
        return this.getY2(x, dots[i]);
      }
    }

    return {
      y: 0,
    };
  }

  getY2(x, dot) {
    const total = 100;

    let pt = this.getPointOnQuad(
      dot.x1,
      dot.y1,
      dot.x2,
      dot.y2,
      dot.x3,
      dot.y3,
      0
    );
    let prevX = pt.x;

    for (let i = 1; i < total; i++) {
      const t = i / total;

      pt = this.getPointOnQuad(
        dot.x1,
        dot.y1,
        dot.x2,
        dot.y2,
        dot.x3,
        dot.y3,
        t
      );

      if (prevX <= x && x <= pt.x) {
        return pt;
      }

      prevX = pt.x;
    }

    return pt;
  }

  getQuadValue(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
  }

  getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
    return {
      x: this.getQuadValue(x1, x2, x3, t),
      y: this.getQuadValue(y1, y2, y3, t),
    };
  }

  checkHill(dots) {
    const closest = this.getY(this.x, dots);

    const dy = closest.y - this.y;

    if (dy < this.radius) {
      this.y = closest.y - this.radius;

      this.vx *= 0.92;
      this.vy *= 0.92;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = `#fff`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
    ctx.closePath();

    ctx.clip();

    ctx.save();
    ctx.translate(this.x, this.y);

    const size = this.imageSize;
    ctx.drawImage(
      this.image,
      -this.radius * (size / 2),
      -this.radius * (size / 2),
      this.radius * size,
      this.radius * size
    );
    ctx.restore();
    ctx.restore();
  }
}
