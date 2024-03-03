const list = document.querySelector(".list");
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};

list.addEventListener("pointerdown", (event) => {
  const { target, clientX, clientY } = event;

  mouse.x = clientX;
  mouse.y = clientY;
  mouse.isDown = true;

  target.style.zIndex = 1;
});

list.addEventListener("pointermove", (event) => {
  if (mouse.isDown) {
    const { target, clientX, clientY } = event;
    const x = clientX - mouse.x;
    const y = clientY - mouse.y;

    target.style.transform = `translate(${x}px, ${y}px)`;
  }
});

list.addEventListener("pointerup", (event) => {
  const { target } = event;

  mouse.x = 0;
  mouse.y = 0;
  mouse.isDown = false;

  target.style.transform = `translate(0px, 0px)`;

  target.style.zIndex = 0;
});
