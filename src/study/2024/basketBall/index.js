import { NetManager } from "./NetManager.js";
import { Ball } from "./Ball.js";
import { GuideLine } from "./GuideLine.js";
import { EventHandlers } from "./EventHandlers.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let ball = null;
let netManager = [];
let guideLine = null;
let eventHandlers = null;

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

  const length = 5;

  for (let i = 0; i < length; i++) {
    const x = (innerWidth / (length + 1)) * (i + 1);
    const y = innerHeight * 0.2;
    const strokeColor = "#fff";
    const rimColor = "#ea826b";

    netManager[i] = new NetManager(x, y, strokeColor, rimColor);
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

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
