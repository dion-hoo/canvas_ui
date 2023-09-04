const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  x: 0,
  y: 0,
  isDown: false,
};

const a = Array.from({ length: 4 }).map(() => {
  return { mouseX: 0 };
});

console.log(a);

let p1x = 100;
let p1y = 100;
let p2x = 200;
let p2y = 200;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dx = mouse.x - p1x;
  const dy = mouse.y - p1y;
  const dz = Math.sqrt(dx * dx + dy * dy);

  const speed = dz * 0.01;

  if (dz > speed && mouse.isDown) {
    p1x += dx / (dz * speed);
    p1y += dy / (dy * speed);
  }

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(p1x, p1y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(p1x, p1y);
  ctx.lineTo(p2x, p2y);
  ctx.strokeStyle = "blue";
  ctx.stroke();

  requestAnimationFrame(animate);
};

const onDown = () => {
  mouse.isDown = true;
};
const onMove = (event) => {
  if (mouse.isDown) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }
};
const onUp = () => {
  mouse.isDown = false;
};

resize();
animate();

window.addEventListener("pointerdown", onDown);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
