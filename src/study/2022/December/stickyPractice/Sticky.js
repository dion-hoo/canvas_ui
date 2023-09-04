import { Point } from './Point.js';

const FOLLOW_SPEED = 0.08;
const WIDTH = 250;
const HEIGHT = 250;
const MAX_ANGLE = 30;
const ROTATE_SPEED = 0.1;
const FPS = 1000 / 60;

export class Sticky {
    constructor() {
        this.pos = new Point();
        this.prevPos = new Point();
        this.startPos = new Point();
        this.downPos = new Point();
        this.target = new Point();
        this.mousePos = new Point();
        this.origin = new Point();
        this.isDown = false;
        this.rotation = 0;
        this.sideValue = 0;
    }

    resize(width, height) {
        this.pos.x = Math.random() * (width - WIDTH);
        this.pos.y = Math.random() * (height - HEIGHT);

        this.target = this.pos.clone();
        this.prevPos = this.pos.clone();
    }

    draw(ctx) {
        const move = this.target.clone().subtract(this.pos).reduce(FOLLOW_SPEED);
        this.pos.add(move);

        this.swingDrag(ctx);
        this.prevPos = this.pos.clone();
    }

    swingDrag(ctx) {
        const dx = this.pos.x - this.prevPos.x;
        const speedX = Math.abs(dx) / FPS;
        const speed = Math.min(Math.max(speedX, 0), 1);

        let rotation = MAX_ANGLE * speed;
        rotation *= dx > 0 ? 1 : -1;

        this.rotation = this.rotation + (rotation - this.rotation) * ROTATE_SPEED;

        const traslatePos = this.pos.clone().add(this.origin);

        ctx.save();
        ctx.translate(traslatePos.x, traslatePos.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.fillRect(-this.origin.x, -this.origin.y, WIDTH, HEIGHT);
        ctx.fill();

        ctx.restore();
    }

    down(point) {
        const isClicked = point.isClick(this.pos, WIDTH, HEIGHT);

        if (isClicked) {
            this.isDown = true;
            this.startPos = this.pos.clone();
            this.downPos = point.clone();

            this.mousePos = point.clone().subtract(this.downPos);
            this.origin.x = this.mousePos.x;
            this.origin.y = this.mousePos.y;
        }
    }

    move(point) {
        if (this.isDown) {
            this.target = this.startPos.clone().subtract(this.downPos).add(point);
        }
    }

    up() {
        this.isDown = false;
    }
}
