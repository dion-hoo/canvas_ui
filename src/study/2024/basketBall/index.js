import { Net } from "./Net.js";
import { Ball } from "./Ball.js";
import { Smoke } from "./smoke.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let nets = [];
let smokes = [];
let smokes2 = [];
let ball = null;
let isPass = false;
let isFlag = false;

const fps = 148;
const fpsTime = 1000 / fps;
let currentTime = 0;

const resetFps = 4;
const resetFpsTime = 1000 / resetFps;
let resetTime = 0;

const mouse = {
  isDown: false,
  isStart: false,
  x: 0,
  y: 0,
};
const touch = {
  x: 0,
  y: 0,
};

const xCoordinatesByRow = [7, 6, 7, 6, 7, 6, 7, 6];
const totalYCoordinates = 7;
const gap = 30;
const halfGap = gap / 2;
const columnGap = Math.sqrt(gap * gap + halfGap * halfGap);

const guideX = innerWidth * 0.5 - 14 + 1;
const guideY = innerHeight - 200;

let width = 0;
let centerX = 0;
let centerY = 0;

const resize = () => {
  const ratio = 1;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  initialize();
};

const initialize = () => {
  ball = null;
  nets = [];

  const ballRadius = 90;
  const ballX = innerWidth * 0.5 - gap / 2;
  const ballY = innerHeight - ballRadius;

  ball = new Ball(ballX, ballY, ballRadius, "orange");

  for (let h = 0; h < totalYCoordinates; h++) {
    const totalXCoordinates = xCoordinatesByRow[h];
    centerY = innerHeight * 0.2;

    for (let w = 0; w < totalXCoordinates; w++) {
      width = gap * totalXCoordinates;
      centerX = innerWidth / 2 - width / 2;

      const x = centerX + gap * w;
      const y = centerY + gap * h;
      const radius = 1;
      const isFixed = h === 0;

      nets.push(new Net(isFixed, x, y, radius, "#000"));
    }
  }

  nets[13].x += gap;
  nets[19].x -= gap;
};

const drawNet = () => {
  for (let y = 0; y < totalYCoordinates; y++) {
    const totalXCoordinates = xCoordinatesByRow[y];
    const startIndex = xCoordinatesByRow
      .slice(0, y)
      .reduce((sum, val) => sum + val, 0);
    const endIndex = startIndex + totalXCoordinates - 1;
    const length = totalXCoordinates + startIndex;

    for (let x = 0; x < totalXCoordinates; x++) {
      const index = startIndex + x;

      const net = nets[index];
      const isSameRow = index < length;
      const cloestColumn = nets[index + 7];

      const even = y % 2 === 0;
      const lastItem = x === totalXCoordinates - 1;
      const isNoDraw = even && lastItem;

      if (isPass) {
        net.move(ball, gap);
        net.resist(ball);
      }

      net.update(1);

      net.move(touch, gap);
      net.windowBounce();
      // net.draw(ctx);

      if (isSameRow && !isNoDraw) {
        if (cloestColumn) {
          net.constraints(ctx, cloestColumn, columnGap);
        }
      }
    }

    // 역순으로 순회
    for (let invX = endIndex; invX >= startIndex; invX--) {
      const net = nets[invX];
      const even = y % 2 === 0;
      const lastItem = invX === startIndex;
      const isNoDraw = even && lastItem;

      if (!net) continue;

      const cloestColumn = nets[invX + 6];

      if (cloestColumn && !isNoDraw) {
        net.constraints(ctx, cloestColumn, columnGap);
      }
    }
  }

  ctx.save();
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 13;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(centerX, centerY - 6);
  ctx.lineTo(centerX + width - gap, centerY - 6);
  ctx.stroke();
  ctx.restore();
};

const startReset = (timeStamp) => {
  if (!resetTime) {
    resetTime = timeStamp;
  }

  const now = timeStamp - resetTime;

  resetTime++;

  if (now > resetFpsTime) {
    resetTime = timeStamp;
    return true;
  } else {
    return false;
  }
};

const drawBall = (timeStamp) => {
  if (mouse.isStart) {
    ball.shooting(mouse);

    if (!ball.isEnd) {
      ball.update(1);
    }

    if (
      ball.isEnd ||
      ball.x < ball.radius ||
      ball.x > innerWidth - ball.radius
    ) {
      const isStart = startReset(timeStamp);

      if (isStart) {
        mouse.isStart = false;
        mouse.isDown = false;
        isPass = false;
        isFlag = false;

        ball.reset();
        ball.setOriginalCroods();

        resetTime = null;
      }
    }
  }

  if (ball.y + ball.radius < centerY && !isFlag) {
    isPass = true;
    isFlag = true;
  }

  ball.windowBounce();
  ball.draw(ctx, mouse);
};

const animate = (timeStamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mouse.isDown) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(guideX, guideY);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  }

  if (!currentTime) {
    currentTime = timeStamp;
  }

  const now = timeStamp - currentTime;

  if (now > fpsTime && isPass) {
    for (let i = 0; i < 10; i++) {
      const x = 0;
      const y = innerHeight;
      const radius = 100;

      smokes.push(new Smoke(x, y, radius));
    }

    for (let i = 0; i < 10; i++) {
      const x = innerWidth;
      const y = innerHeight;
      const radius = 100;

      smokes2.push(new Smoke(x, y, radius));
    }

    currentTime = timeStamp;
  }

  if (!isPass) {
    drawNet();
    drawBall(timeStamp);
  } else {
    drawBall(timeStamp);
    drawNet();
  }

  // smokes.forEach((smoke, index) => {
  //   smoke.move();
  //   smoke.moveMouse(mouse);
  //   smoke.draw(ctx);

  //   if (smoke.isEnd) {
  //     smokes.splice(index, 1);
  //   }
  // });

  // smokes2.forEach((smoke, index) => {
  //   smoke.move();
  //   smoke.moveMouse(mouse);
  //   smoke.draw(ctx);

  //   if (smoke.isEnd) {
  //     smokes2.splice(index, 1);
  //   }
  // });

  currentTime++;

  requestAnimationFrame(animate);
};

const setGuideLine = (event) => {
  const dx = event.clientX - guideX;
  const dy = event.clientY - guideY;
  const dist = Math.hypot(dx, dy);
  const maxDist = innerHeight * 0.3;
  const isFar = dist > maxDist;

  const angle = Math.atan2(dy, dx);

  const x = guideX + Math.cos(angle) * maxDist;
  const y = guideY + Math.sin(angle) * maxDist;

  mouse.x = isFar ? x : event.clientX;
  mouse.y = isFar ? y : event.clientY;
};

const onMove = (event) => {
  if (!mouse.isStart) {
    mouse.isDown = true;
    setGuideLine(event);
  }

  touch.x = event.clientX;
  touch.y = event.clientY;
};

const onClick = () => {
  // canvas.classList.add("active");
};

const onUp = (event) => {
  setGuideLine(event);

  ball.isGetTargetCoordinate = false;
  mouse.isStart = true;
  mouse.isDown = false;
};

resize();
animate();

window.addEventListener("click", onClick);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("resize", resize);
