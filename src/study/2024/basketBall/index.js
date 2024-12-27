import { Net } from "./Net.js";
import { NetManager } from "./NetManager.js";
import { Ball } from "./Ball.js";
import { Smoke } from "./smoke.js";
import { GuideLine } from "./GuideLine.js";
import { EventHandlers } from "./EventHandlers.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let ball = null;
let netManager = [];
let guideLine = null;
let eventHandlers = null;
let smokes = [];
let smokes2 = [];

// time
const fps = 148;
const fpsTime = 1000 / fps;
let currentTime = 0;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  initialize();
};

const createBall = () => {
  ball = null;

  const radius = 90;
  const x = innerWidth * 0.5;
  const y = innerHeight - radius;

  ball = new Ball(x, y, radius);
};

const createnetManager = () => {
  netManager = [];

  const colors = ["#1c9", "#ff0000", "#0044ff"];
  const length = 1;

  for (let i = 0; i < length; i++) {
    const x = (innerWidth / (length + 1)) * (i + 1);
    const y = innerHeight * 0.2;
    const rimColor = colors[i];

    netManager[i] = new NetManager(x, y, rimColor);
  }
};

const createGuideLine = () => {
  guideLine = null;

  const padding = 20;
  const x = innerWidth * 0.5;
  const y = innerHeight - ball.radius * 2 - padding;

  guideLine = new GuideLine(x, y);
};

const createEventHandlers = () => {
  eventHandlers = new EventHandlers(ball, guideLine);
  eventHandlers.registerEvents();
};

const initialize = () => {
  createBall();
  createnetManager();
  createGuideLine();
  createEventHandlers();
};

const drawNetManager = (touch) => {
  netManager.forEach((net) => {
    net.draw(ctx, ball, touch, ball.isRimPassed);
  });
};

const drawBall = (timeStamp, mouse) => {
  if (mouse.isStart) {
    ball.throw(timeStamp, mouse);
  }

  ball.updatePassedBall();
  ball.windowRebound();
  ball.draw(ctx, mouse);
};

const animate = (timeStamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const mouse = eventHandlers.mouse;
  const touch = eventHandlers.touch;

  if (mouse.isDown) {
    guideLine.draw(ctx, mouse);
  }

  if (!ball.isRmPassed) {
    drawNetManager(touch);
    drawBall(timeStamp, mouse);
  } else {
    drawBall(timeStamp, mouse);
    drawNetManager(touch);
  }

  // if (!currentTime) {
  //   currentTime = timeStamp;
  // }
  // const now = timeStamp - currentTime;

  // if (now > fpsTime && ball.isRmPassed) {
  //   for (let i = 0; i < 10; i++) {
  //     const x = 0;
  //     const y = innerHeight;
  //     const radius = 100;

  //     smokes.push(new Smoke(x, y, radius));
  //   }

  //   for (let i = 0; i < 10; i++) {
  //     const x = innerWidth;
  //     const y = innerHeight;
  //     const radius = 100;

  //     smokes2.push(new Smoke(x, y, radius));
  //   }

  //   currentTime = timeStamp;
  // }

  // smokes.forEach((smoke, index) => {
  //   smoke.move();
  //   smoke.moveMouse(touch);
  //   smoke.draw(ctx);

  //   if (smoke.isEnd) {
  //     smokes.splice(index, 1);
  //   }
  // });

  // smokes2.forEach((smoke, index) => {
  //   smoke.move();
  //   smoke.moveMouse(touch);
  //   smoke.draw(ctx);

  //   if (smoke.isEnd) {
  //     smokes2.splice(index, 1);
  //   }
  // });

  // currentTime++;

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
