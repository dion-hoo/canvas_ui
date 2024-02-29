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

const obj = {
  x: 200,
  y: 200,
  moveX: 200,
  dx: 0,
};
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  obj.moveX = obj.x + 1;
  obj.dx = obj.moveX - obj.x; // 거리는 누적시키지 않고 계속 새로운 값으로 갱신해줌
  obj.x = obj.x + obj.dx;

  //   obj.moveX = obj.x + 1;
  //   obj.dx += obj.moveX - obj.x; // 거리를 계속 누적함
  //   obj.dx *= 0.5;

  //   obj.x += obj.dx;

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
