const list = document.querySelector('.list');
let isDown = false;
const position = [];
const mouse = {
    x: 0,
    y: 0,
};

const li = document.createElement('li');

const onDown = (event, element) => {
    const { clientX, clientY, pointerId } = event;

    mouse.x = clientX;
    mouse.y = clientY;

    isDown = true;
    element.setPointerCapture(pointerId);
};

const onMove = (event, element, index) => {
    if (isDown) {
        const { clientX, clientY } = event;
        const { x, y } = mouse;

        const left = clientX - x;
        const top = clientY - y;

        element.style.transform = `translate3d(${left}px, ${top}px, 0)`;

        const aa = position[0].top;
        const bb = position[0].height;
        const cc = position[1].top;
        const dd = position[1].height;

        const direction = dd - bb > 0 ? bb + Math.abs(dd - bb) / 2 : bb + Math.abs(dd - bb) / 2;

        console.log(direction);

        if (top > direction) {
            // list.children[1].style.transition = 'transform 700ms cubic-bezier(0, 1.61, 0.27, 0.87);';
            list.children[1].style.transform = `translate3d(0, ${-bb}px, 0)`;
        }

        // if (top > 124.5) {
        //     // list.children[1].style.transition = 'transform 700ms cubic-bezier(0, 1.61, 0.27, 0.87);';
        //     list.children[2].style.transform = `translate3d(0, ${-83}px, 0)`;
        // }
    }
};
const onUp = (_, element) => {
    isDown = false;

    element.style.transform = `translate3d(0, 0, 0)`;

    list.appendChild(list.firstElementChild);
    // list.firstElementChild.style.transition = 'none';
    list.firstElementChild.style.transform = `translate3d(0, 0, 0)`;

    // 여기서 position다시 세팅
};

[...list.children].map((el, index) => {
    const { left, top, width, height } = el.getBoundingClientRect();

    position[index] = {
        left,
        top,
        width,
        height,
    };

    el.addEventListener('pointerdown', (event) => onDown(event, el));
    el.addEventListener('pointermove', (event) => onMove(event, el, index));
    el.addEventListener('pointerup', (event) => onUp(event, el));
});
