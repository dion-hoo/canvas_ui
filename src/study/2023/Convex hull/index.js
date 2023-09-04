const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);
};

// convex hull algorithm

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
