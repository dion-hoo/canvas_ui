import { Hill } from './hill.js';

export class HillGroup {
    constructor(total) {
        this.total = total;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this.init();
    }

    init() {
        this.hills = [];

        const x1 = this.width / (this.total - 1);
        const radius = 10;

        for (let i = 0; i < this.total; i++) {
            const x = x1 * i;
            const y = this.height * 0.7;

            this.hills.push(new Hill(x, y, radius, i));
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#576F72'; //E4DCCF

        ctx.beginPath();

        let prevX = this.hills[0].x;
        let prevY = this.hills[0].y;

        ctx.moveTo(prevX, prevY);

        for (let h = 0; h < this.hills.length; h++) {
            if (h === 0) continue;

            let hill = this.hills[h];
            hill.update();

            const cx = (hill.x + prevX) / 2;
            const cy = (hill.y + prevY) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            // ctx.arc(hill.x, hill.y, hill.radius, 0, Math.PI * 2);

            prevX = hill.x;
            prevY = hill.y;
        }

        const last = this.hills[this.hills.length - 1];

        ctx.lineTo(last.x, last.y);

        ctx.lineTo(this.width, this.height);
        ctx.lineTo(0, this.height);

        ctx.fill();
        ctx.closePath();
    }
}
