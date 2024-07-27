export class Circle {
  constructor(fruitName, x, y, radius, imageSrc) {
    this.fruitName = fruitName;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.radius = radius;
    this.force = {
      x: 0,
      y: 0.8,
    };
    this.mass = radius * 0.3;
    this.isFusion = false;
    this.isCollision = false;

    this.rotate = 0;
    this.rotateVelocity = 0;

    this.image = new Image();
    this.image.src = imageSrc;
  }

  update(time) {
    this.vx = this.x - this.oldX;
    this.vy = this.y - this.oldY;

    this.oldX = this.x;
    this.oldY = this.y;

    const ax = this.force.x / 1;
    const ay = this.force.y / 1;

    this.x += this.vx + ax * time * time;
    this.y += this.vy + ay * time * time;

    this.rotateVelocity = Math.min(this.rotateVelocity, 0.9);

    this.rotate += this.rotateVelocity;

    this.rotate *= 0.89;
  }

  collision(circle) {
    for (let i = 0; i < circle.length; i++) {
      const target = circle[i];

      if (this === target) {
        continue;
      }

      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const distance = dx * dx + dy * dy;

      const dist = Math.sqrt(distance);
      const length = this.radius + target.radius;
      const minDistance = length * length;

      if (distance < minDistance) {
        const diff = length - dist;
        const percent = diff / dist / 2;

        let tx = dx * percent;
        let ty = dy * percent;

        const maxMovement = 2;
        tx = Math.sign(tx) * Math.min(Math.abs(tx), maxMovement);
        ty = Math.sign(ty) * Math.min(Math.abs(ty), maxMovement);

        this.x -= tx;
        this.y -= ty;

        target.x += tx;
        target.y += ty;

        // 회전
        const nomarlized = {
          x: dx / dist,
          y: dy / dist,
        };
        const relativeVelocity = {
          x: this.vx - target.vx,
          y: this.vy - target.vy,
        };

        let rotationalSpeed =
          relativeVelocity.x * nomarlized.x + relativeVelocity.y * nomarlized.y;

        const crossProduct =
          relativeVelocity.x * nomarlized.y - relativeVelocity.y * nomarlized.x;

        if (rotationalSpeed > 0) {
          if (crossProduct > 0) {
            // 반시계방향
            this.rotateVelocity += rotationalSpeed / this.mass;
            target.rotateVelocity -= rotationalSpeed / target.mass;
          } else {
            this.rotateVelocity -= rotationalSpeed / this.mass;
            target.rotateVelocity += rotationalSpeed / target.mass;
          }
        }

        const isSameColor = this.fruitName === target.fruitName;

        if (isSameColor) {
          this.centerX = (this.x + target.x) / 2;
          this.centerY = (this.y + target.y) / 2;

          this.isFusion = true;
        }

        if (isSameColor) {
          this.isCollision = true;
          target.isCollision = true;
        }
      }
    }
  }

  constraints() {
    if (this.x < this.radius) {
      this.x = this.radius;
      this.oldX = this.x + this.vx / 2;
    } else if (this.x > innerWidth - this.radius) {
      this.x = innerWidth - this.radius;
      this.oldX = this.x + this.vx / 2;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.oldY = this.y;
    } else if (this.y > innerHeight - this.radius) {
      this.y = innerHeight - this.radius;
      this.oldY = this.y;
    }
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate);

    ctx.drawImage(
      this.image,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );

    ctx.restore();
  }
}
