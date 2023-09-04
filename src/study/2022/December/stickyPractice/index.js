import { Point } from './Point.js';
import { Sticky } from './Sticky.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let mouse = null;
let item = null;
let isDown = false;

const init = () => {
    mouse = new Point();
    item = new Sticky();
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    item.resize(innerWidth, innerHeight);

    ctx.scale(ratio, ratio);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    item.draw(ctx);

    requestAnimationFrame(animate);
};

const onDown = (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    isDown = true;

    item.down(mouse.clone());
};
const onMove = (event) => {
    if (isDown) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;

        item.move(mouse.clone());
    }
};
const onUp = () => {
    isDown = false;
};

window.addEventListener('pointerdown', onDown);
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', onUp);
window.addEventListener('resize', resize);
window.onload = () => {
    init();
    resize();
    animate();
};
