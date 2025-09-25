export class Sticker {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.grabPoint = {
      x: this.x + this.width - 100,
      y: this.y + 100,
    };

    this.p1 = {
      x: this.x + this.width - 100,
      y: this.y,
    };

    this.p2 = {
      x: this.x + this.width,
      y: this.y + 100,
    };

    const dx = this.p2.x - this.p1.x;
    const dy = this.p2.y - this.p1.y;

    const dist = Math.hypot(dx, dy);

    this.crossDist = dist;

    this.controlPoint1 = {
      x: this.x + this.width - 50,
      y: this.y + 50,
    };

    this.controlPoint2 = {
      x: this.x + this.width - 50,
      y: this.y + 150,
    };

    this.tension = 0.3;

    this.velocity = { x: 0, y: 0 };
    this.lastPosition = { x: 0, y: 0 };
    this.elasticity = 0.8;
    this.friction = 0.95;
    
    this.image = new Image();
    this.image.src = '../../../assets/img/image01.png';
  }

  move(target, point) {
    const dx = target.x - point.x;
    const dy = target.y - point.y;
    
    this.velocity.x = dx * 0.1;
    this.velocity.y = dy * 0.1;
    
    point.x += this.velocity.x;
    point.y += this.velocity.y;
    
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
  }

  update(mouse) {
    if (mouse.isDown) {
      const maxX = this.x + this.width;
      const minX = this.x;
      const maxY = this.y + this.height;
      const minY = this.y;

      const isInTopRightArea = mouse.x > this.x + this.width * 0.7 && mouse.y < this.y + this.height * 0.3;
      
      if (isInTopRightArea) {
        const dx = mouse.x - this.grabPoint.x;
        const dy = mouse.y - this.grabPoint.y;
        
        if (dx < 0 && dy > 0) {
          this.grabPoint.x = Math.min(maxX, Math.max(minX, mouse.x));
          this.grabPoint.y = Math.min(maxY, Math.max(minY, mouse.y));
          
          this.move(this.grabPoint, this.p1);
          
          if (this.grabPoint.x < this.x + this.width * 0.3 && this.grabPoint.y > this.y + this.height * 0.7) {
            this.velocity.x *= 1.2;
            this.velocity.y *= 1.2;
          }
        }
      }
    }
  }

  drawPoint(ctx, point) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  constraints(t1, t2, max, min) {
    const dx = t2.x - t1.x;
    const dy = t2.y - t1.y;
    const dist = Math.hypot(dx, dy);

    const gap = dist > max ? max : dist < min ? min : dist;
    const angle = Math.atan2(dy, dx);

    t2.x = t1.x + Math.cos(angle) * gap;
    t2.y = t1.y + Math.sin(angle) * gap;
  }

  draw(ctx) {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();

    if (this.image.complete) {
      ctx.save();
      ctx.clip();
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.bezierCurveTo(
      this.controlPoint1.x, this.controlPoint1.y,
      this.controlPoint2.x, this.controlPoint2.y,
      this.p2.x, this.p2.y
    );
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.stroke();

    ctx.restore();

    const dx = this.grabPoint.x - (this.x + this.width - 100);
    const dy = this.grabPoint.y - (this.y + 100);
    
    const movementIntensity = Math.sqrt(dx * dx + dy * dy) / 100;
    const dynamicTension = this.tension * (1 + movementIntensity);
    
    this.controlPoint1.x = this.p1.x + dx * dynamicTension;
    this.controlPoint1.y = this.p1.y + dy * dynamicTension;
    
    this.controlPoint2.x = this.p2.x + dx * dynamicTension;
    this.controlPoint2.y = this.p2.y + dy * dynamicTension;

    this.drawPoint(ctx, this.grabPoint);
    this.drawPoint(ctx, this.p1);
    this.drawPoint(ctx, this.p2);

    this.constraints(this.grabPoint, this.p1, this.height, 0);
    this.constraints(this.grabPoint, this.p2, this.height, 0);
    this.constraints(this.p1, this.p2, this.height, this.crossDist);
  }
}
