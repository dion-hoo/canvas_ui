export class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = Math.random() * 3 - 1;
        this.radius = radius;
        this.color = '#7D9D9C';
        this.end = false;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    update() {
        this.vy += 0.09;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= this.radius || this.x > this.width - this.radius) {
            this.vx *= -0.5;
            this.x += this.vx;
        }

        if (this.y > this.height * 0.8 - this.radius) {
            this.vy *= -0.77;
            this.y += this.vy;
        }

        if (this.y > this.height * 0.8 - this.radius) {
            this.end = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
