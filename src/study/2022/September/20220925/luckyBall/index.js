import { Ball } from './ball.js';
import { HillGroup } from './hillGroup.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let ball = [];
let hillGroup = null;
const MAXBALLLENGHT = 30;
const RADIUS = 40;

const randomPosition = () => {
    let x = Math.random() * (innerWidth - RADIUS * 2) + RADIUS;
    let y = Math.random() * -200;

    return { x, y };
};

const init = () => {
    // hill
    hillGroup = new HillGroup(10);

    // ball
    let protection = 0;
    while (ball.length < MAXBALLLENGHT) {
        if (protection > Math.pow(MAXBALLLENGHT, 2)) {
            break;
        }
        const { x, y } = randomPosition();
        const b = {
            x: x,
            y: y,
            r: RADIUS,
        };

        // overlap check
        let overlapping = false;
        for (let j = 0; j < ball.length; j++) {
            const circle = ball[j];
            const distance = Math.sqrt(Math.pow(b.x - circle.x, 2) + Math.pow(b.y - circle.y, 2));

            if (distance < b.r + circle.radius) {
                overlapping = true;
                break;
            }
        }
        protection++;

        if (!overlapping) {
            ball.push(new Ball(b.x, b.y, b.r));
        }
    }
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    ctx.scale(ratio, ratio);

    for (let b of ball) {
        b.resize(innerWidth, innerHeight);
    }
    hillGroup.resize(innerWidth, innerHeight);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let b of ball) {
        b.update();
        b.draw(ctx);
    }
    hillGroup.draw(ctx);

    const finish = ball.every((b) => b.end);

    if (finish) return;

    requestAnimationFrame(animate);
};

const onDown = (event) => {};
const onMove = () => {};
const onUp = () => {};

window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};

window.addEventListener('pointerdown', onDown);
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', onUp);
