export class Point {
  constructor(index, x, y, radius) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;

    this.force = {
      x: 0,
      y: 0,
    };
    this.gravity = {
      x: 0,
      y: 0.5,
    };
    this.mass = this.radius * 1.4;

    this.color = "#fff";
    this.damping = 0.4;
    this.isInner = false;
    this.isTriangleInner = false;

    this.isOutAble = false;
    this.isOut = false;
  }

  update(dt, deltaTime) {
    this.vx = this.x - this.oldX;
    this.vy = this.y - this.oldY;

    this.oldX = this.x;
    this.oldY = this.y;

    const ax = this.force.x / this.mass;
    const ay = this.force.y / this.mass;

    this.x += this.vx + ax * dt * dt + this.gravity.x * deltaTime;
    this.y += this.vy + ay * dt * dt + this.gravity.y * deltaTime;
  }

  getArea(p1, p2, p3) {
    const v = {
      x: p2.x - p1.x,
      y: p2.y - p1.y,
    };

    const w = {
      x: p3.x - p1.x,
      y: p3.y - p1.y,
    };

    return Math.abs((v.x * w.y - v.y * w.x) / 2);
  }

  checkTriangle(p1, p2, p3) {
    const distances = [
      this.getDistanceFromProjection(p1, p2),
      this.getDistanceFromProjection(p2, p3),
      this.getDistanceFromProjection(p3, p1),
    ];

    return distances.every((d) => d >= this.radius);
  }

  getDistanceFromLine(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    const numerator =
      (p2.y - p1.y) * this.x -
      (p2.x - p1.x) * this.y -
      p1.x * p2.y +
      p2.x * p1.y;
    const denominator = Math.sqrt(dx * dx + dy * dy);
    const distance = Math.abs(numerator / denominator);

    return distance;
  }

  getDistanceFromProjection(p1, p2) {
    const v = {
      x: p2.x - p1.x,
      y: p2.y - p1.y,
    };

    const w = {
      x: this.x - p1.x,
      y: this.y - p1.y,
    };

    const proj = v.x * w.y - v.y * w.x;
    const dist = Math.sqrt(v.x * v.x + v.y * v.y);

    return Math.abs(proj / dist);
  }

  boundary(triangle, point) {
    const triangleList = triangle.arr;

    const p1 = triangleList[0];
    const p2 = triangleList[1];
    const p3 = triangleList[2];

    const outBall = {
      index: null,
      dist: 999999,
    };
    for (let i = 0; i < point.length; i++) {
      const p = point[i];

      const totalArea = this.getArea(p1, p2, p3);

      const area1 = this.getArea(p1, p2, p);
      const area2 = this.getArea(p2, p3, p);
      const area3 = this.getArea(p3, p1, p);

      const isSameArea =
        Math.abs(totalArea - (area1 + area2 + area3)) < 0.000001;
      const isFar = this.checkTriangle(p1, p2, p3);

      if (p.isTriangleInner) {
        const distance = this.getDistanceFromProjection(p2, p3);

        if (distance < outBall.dist) {
          outBall.index = i;
          outBall.dist = distance;
        }
      }

      p.isTriangleInner = isSameArea && isFar;
      p.color = p.isTriangleInner ? "red" : "#fff";
    }
  }

  prison(circle, mouse) {
    const dx = circle.x - this.x;
    const dy = circle.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = circle.radius - this.radius;

    if (dist < minDist) {
      this.isInner = true;
    }

    if (mouse.isClick && this.isTriangleInner) {
      this.isOutAble = true;
    }

    if (dist > minDist && this.isInner) {
      const diff = dist - minDist;
      const percent = diff / dist / 2;

      const tx = dx * percent;
      const ty = dy * percent;

      this.x += tx;
      this.y += ty;
    }
  }

  constraints(point) {
    for (let i = 0; i < point.length; i++) {
      const p = point[i];

      if (this === p) {
        continue;
      }

      const dx = p.x - this.x;
      const dy = p.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = this.radius + p.radius;

      if (dist < minDist) {
        const diff = dist - minDist;
        const percent = diff / dist / 2;

        const tx = dx * percent;
        const ty = dy * percent;

        this.x += tx;
        this.y += ty;

        p.x -= tx;
        p.y -= ty;
      }
    }
  }

  windowBounce() {
    if (this.x < this.radius) {
      this.x = this.radius;
      this.oldX = this.x + this.vx * this.damping;
    }

    if (this.x > innerWidth - this.radius) {
      this.x = innerWidth - this.radius;

      this.oldX = this.x + this.vx * this.damping;
    }

    if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;

      this.oldY = this.y + this.vy * this.damping;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
