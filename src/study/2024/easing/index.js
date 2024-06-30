const anchor = document.querySelector(".anchor");
const ball = document.querySelector(".ball");

const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};

let K = 0.01; // 탄성계수
let velocity = {
  x: 0,
  y: 0,
};
let position = {
  x: 0,
  y: 0,
};
let restLength = innerHeight * 0.3;

const anchorClientRect = anchor.getBoundingClientRect();

const animate = () => {
  const ballClientRect = ball.getBoundingClientRect();

  const force = {
    x:
      ballClientRect.x +
      ballClientRect.width / 2 -
      (anchorClientRect.x + anchorClientRect.width / 2),
    y: ballClientRect.y - anchorClientRect.y,
  };
  const distance = Math.sqrt(force.x * force.x + force.y * force.y);
  const x = distance - restLength;

  const normalize = {
    x: force.x / distance,
    y: force.y / distance,
  };

  const springForce = {
    x: -K * x * normalize.x,
    y: -K * x * normalize.y,
  };

  velocity.x += springForce.x;
  velocity.y += springForce.y;

  position.x += velocity.x;
  position.y += velocity.y;

  velocity.x *= 0.99;
  velocity.y *= 0.99;

  if (mouse.isDown) {
    position.x = mouse.x;
    position.y = mouse.y;

    velocity.x = 0;
    velocity.y = 0;
  }

  ball.style.transform = `translateX(calc(-50% + ${position.x}px)) translateY(calc(-50% + ${position.y}px))`;

  requestAnimationFrame(animate);
};

animate();

const onDown = (event) => {
  mouse.isDown = true;

  mouse.x = event.clientX - innerWidth / 2;
  mouse.y = event.clientY - innerHeight * 0.45;
};

const onMove = (event) => {
  if (mouse.isDown) {
    mouse.x = event.clientX - innerWidth / 2;
    mouse.y = event.clientY - innerHeight * 0.45;
  }
};
const onUp = () => {
  mouse.isDown = false;
};

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
