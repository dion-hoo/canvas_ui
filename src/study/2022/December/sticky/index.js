import { Point } from './Point.js';
import { Dialog } from './Dialog.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ratio = devicePixelRatio;
let mousePos = null;
let isDown = false;
const items = [];
const total = 1;

const init = () => {
    mousePos = new Point();

    for (let i = 0; i < total; i++) {
        items.push(new Dialog());
    }
};

const resize = () => {
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;

    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';

    for (let item of items) {
        item.resize(innerWidth, innerHeight);
    }

    ctx.scale(ratio, ratio);
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let item of items) {
        item.animate(ctx);
    }

    requestAnimationFrame(animate);
};

const onDown = (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    isDown = true;

    for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i].down(mousePos.clone());

        // 클릭한 스티커가 제일 위에 올라오게 하기 위해서
        if (item) {
            const index = items.indexOf(item);
            items.push(items.splice(index, 1)[0]);

            break;
        }
    }
};

const onMove = (e) => {
    if (isDown) {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;

        for (let i = 0; i < items.length; i++) {
            items[i].move(mousePos.clone());
        }
    }
};

const onUp = () => {
    isDown = false;
    for (let i = 0; i < items.length; i++) {
        items[i].up();
    }
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
