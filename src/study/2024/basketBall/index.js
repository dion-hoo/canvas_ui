import { NetManager } from "./NetManager.js";
import { Ball } from "./Ball.js";
import { GuideLine } from "./GuideLine.js";
import { EventHandlers } from "./EventHandlers.js";
import { Line } from "./Line.js";
import { Beat } from "./Beat.js";
import { Taregt } from "./Target.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const socre = document.querySelector(".score");

let ball = [];
let netManager = [];
let guideLine = null;
let eventHandlers = null;
let line = null;
let beat = [];

let fps = 60;
let fpsTime = 1000 / fps;
let currentTime = 0;

let beatfps = 1.4;
let beatFpsTime = 1000 / beatfps;
let beatCurrentTime = 0;
let target = null;

const beatColor = "orange";

const resize = () => {
  const ratio = 1; // devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  ball = [];

  initialize();
};

const createLine = () => {
  line = null;

  const x = innerWidth * 0.5;
  const y = innerHeight;

  line = new Line(x, y, beatColor);
};

const createBall = () => {
  const radius = innerHeight * 0.0639;
  const padding = innerHeight * 0.01;

  const x = innerWidth * 0.5;
  const y = innerHeight - radius - padding;

  ball.push(new Ball(x, y, radius));
};

const createTarget = () => {
  target = null;

  const radius = innerHeight * 0.0639;
  const padding = innerHeight * 0.01;

  const x = innerWidth * 0.5;
  const y = innerHeight - radius - padding;

  target = new Taregt(x, y, radius, beatColor);
};

const createBeat = () => {
  for (let i = 0; i < 1; i++) {
    const radius = innerHeight * 0.057;

    const width = innerWidth * 0.4;
    const perspective = width * 0.7;
    const space = innerWidth * 0.1;
    const minX =
      innerWidth * 0.5 - width + perspective + space - space / 2 + radius / 2;
    const maxX = innerWidth * 0.5 + width - perspective - space + space / 2;

    const x = Math.random() * (maxX - minX) + minX;
    const y = innerHeight * 0.4 + i * 100;

    beat.push(new Beat(x, y, radius, beatColor));
  }
};

// false true
const isMove = false;
const isRoundMove = false;

const createNetManager = () => {
  netManager = [];

  // true false
  const length = 1;
  const isRandomColor = false;

  const getRandomRgbColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  for (let i = 0; i < length; i++) {
    const x = (innerWidth / (length + 1)) * (i + 1);
    const y = innerHeight * 0.2;
    const strokeColor = "#fff";
    const rimColor = isRandomColor ? getRandomRgbColor() : "#ea826b";

    netManager[i] = new NetManager(x, y, strokeColor, rimColor);
  }
};

const createGuideLine = () => {
  guideLine = null;

  const padding = innerHeight * 0.0143;
  const x = innerWidth * 0.5;
  const y = innerHeight - innerHeight * 0.0639 * 2 - padding;
  const color = "#fff";

  guideLine = new GuideLine(x, y, color);
};

const createEventHandlers = () => {
  eventHandlers = new EventHandlers(ball, createBall, guideLine);
  eventHandlers.registerEvents();
};

const initialize = () => {
  createLine();
  createTarget();
  createBall();
  createNetManager();
  createGuideLine();
  createEventHandlers();
};

const drawLine = () => {
  line.draw(ctx);
};

const drawBeat = () => {
  beat.forEach((b) => {
    const target = {
      x: innerWidth * 0.5,
      y: innerHeight - b.radius,
    };

    b.update(target);
    b.draw(ctx);
  });

  beat.forEach((b, index) => {
    if (b.isEnd) {
      beat.splice(index, 1);
    }
  });
};

const drawNetManager = (ball, touch) => {
  netManager.forEach((net) => {
    if (isMove) {
      net.moveMoment(0.01, isRoundMove);
    }

    net.draw(ctx, ball, touch);
  });
};

const drawTarget = () => {
  target.draw(ctx);
};

const drawRimPedestal = () => {
  netManager.forEach((net) => {
    net.drawRimPedestal(ctx);
  });
};

const drawBall = (timeStamp, mouse) => {
  ball.forEach((b) => {
    if (b.isStart) {
      b.throw(timeStamp, mouse);
    }

    socre.innerHTML = b.score;

    b.updatePassedBall();
    b.windowRebound();
    b.draw(ctx);
  });

  if (ball.length > 1) {
    ball.forEach((b, index) => {
      if (b.isEnd) {
        ball.splice(index, 1);
      }
    });
  }
};

const animate = (timeStamp) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const mouse = eventHandlers.mouse;
  const touch = eventHandlers.touch;

  if (!currentTime) {
    currentTime = timeStamp;
  }
  // const delta = timeStamp - currentTime;

  if (!beatCurrentTime) {
    beatCurrentTime = timeStamp;
  }

  const bestStart = timeStamp - beatCurrentTime;

  if (bestStart > beatFpsTime) {
    createBeat();

    beatCurrentTime = timeStamp;
  }

  drawTarget();
  drawBeat();
  drawLine();

  if (mouse.x !== null && mouse.y !== null) {
    guideLine.draw(ctx, mouse);
  }

  drawRimPedestal();
  drawNetManager(ball, touch);
  drawBall(timeStamp, mouse);

  beatCurrentTime++;

  requestAnimationFrame(animate);
};

resize();
animate();

window.addEventListener("resize", resize);
