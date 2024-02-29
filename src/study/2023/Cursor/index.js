const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const pointer = {
  x: innerWidth * 0.5,
  y: innerHeight * 0.5,
};

const p = {
  x: 0,
  y: 0,
};
const params = {
  length: 30,
  friction: 0.5,
  delay: 0.1,
};
const trail = [];

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  for (let i = 0; i < params.length; i++) {
    trail[i] = {
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    };
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.shadowColor = "#fff";
  ctx.shadowBlur = 2;

  for (let i = 0; i < trail.length; i++) {
    const t = trail[i];
    const prev = i === 0 ? pointer : trail[i - 1];
    const delay = i === 0 ? 1 : params.delay;

    t.dx += (prev.x - t.x) * delay;
    t.dy += (prev.y - t.y) * delay;

    t.dx *= params.friction;
    t.dy *= params.friction;

    t.x += t.dx;
    t.y += t.dy;

    if (i === 0) {
      ctx.beginPath();
      ctx.moveTo(t.x, t.y);
    }
  }

  for (let i = 1; i < trail.length - 1; i++) {
    const cx = (trail[i].x + trail[i + 1].x) / 2;
    const cy = (trail[i].y + trail[i + 1].y) / 2;

    ctx.strokeStyle = `hsl(${i * 4},100%, 50%)`;
    ctx.lineWidth = (params.length - i) * 4;

    ctx.quadraticCurveTo(trail[i].x, trail[i].y, cx, cy);
    ctx.stroke();
  }

  requestAnimationFrame(animate);
};

resize();
animate();

const onClick = (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
};
const onMove = (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
};

window.addEventListener("click", onClick);
window.addEventListener("pointermove", onMove);
window.addEventListener("resize", resize);
