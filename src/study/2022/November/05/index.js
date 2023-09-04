import { Ball } from './ball.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let ball = [];
let hsl = 0;

const init = () => {
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * 100 + 100;
        const y = Math.random() * 1000 + 100;
        const radius = 10;

        ball.push(new Ball(x, y, radius, hsl));
        hsl += 150;
    }
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let b of ball) {
        b.draw(ctx);
    }

    requestAnimationFrame(animate);
};

window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};
