import { useScroll } from './useScroll.js';

const button = document.querySelector('.button');

const end = document.body.clientHeight - window.innerHeight;

button.addEventListener('click', () => {
    useScroll(end, 1, 10);
});
