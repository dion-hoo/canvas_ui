export class Circle {
  constructor(index, alphabet, x, y, radius, color, fontColor) {
    this.index = index;
    this.alphabet = alphabet;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.vx = 0;
    this.vy = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.radius = radius;
    this.color = color;
    this.fontColor = fontColor;
    this.force = {
      x: 0,
      y: 0.3,
    };
    this.mass = radius * 0.3;
    this.isFusion = false;
    this.isCollision = false;

    this.rotate = 0;
    this.rotateVelocity = 0;
    this.isGrab = false;
    this.lineWidth = 15;
  }

  update(time, mouse) {
    if (this.isGrab) {
      this.x = mouse.x;

      this.oldX = this.x;
    } else {
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
      const length = this.radius + target.radius + this.lineWidth;
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

        if (this.alphabet === "M") {
          return;
        }

        const isSameColor = this.alphabet === target.alphabet;

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
    if (this.x < this.radius + this.lineWidth / 2) {
      this.x = this.radius + this.lineWidth / 2;
      this.oldX = this.x + this.vx / 2;
    } else if (this.x > innerWidth - this.radius - this.lineWidth / 2) {
      this.x = innerWidth - this.radius - this.lineWidth / 2;
      this.oldX = this.x + this.vx / 2;
    }

    if (this.y < this.radius - this.lineWidth / 2) {
      this.y = this.radius - this.lineWidth / 2;
      this.oldY = this.y + this.vy * 0.1;
    } else if (this.y > innerHeight - this.radius - this.lineWidth / 2) {
      this.y = innerHeight - this.radius - this.lineWidth / 2;
      this.oldY = this.y + this.vy * 0.3;
    }
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate);

    if (this.alphabet === "M") {
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      ctx.shadowBlur = 20;

      ctx.globalCompositeOperation = "lighter";

      const gradient = ctx.createLinearGradient(0, 0, this.radius, this.radius);
      gradient.addColorStop(0, "red");
      gradient.addColorStop(1 / 6, "orange");
      gradient.addColorStop(2 / 6, "yellow");
      gradient.addColorStop(3 / 6, "green");
      gradient.addColorStop(4 / 6, "blue");
      gradient.addColorStop(5 / 6, "indigo");
      gradient.addColorStop(1, "violet");

      ctx.strokeStyle = gradient;
    } else {
      ctx.strokeStyle = this.color;
    }

    ctx.fillStyle = "#fff";

    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    const fontSize = this.radius;
    const font = ctx.measureText(this.index);

    ctx.font = `600 ${fontSize * 1.6}px Hind`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.fontColor;
    ctx.fillText(
      this.alphabet,
      (this.radius - fontSize) / 2,
      font.actualBoundingBoxAscent +
        font.actualBoundingBoxDescent +
        fontSize / 7
    );

    ctx.restore();
  }
}
