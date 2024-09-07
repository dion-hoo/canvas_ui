import { map } from "./map.js";
import { Particle } from "./Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const audio = new Audio("./grand_escape.mp4");

let isClick = false;
let audioCtx = null;
let wave = [];
let analyser = null;
let particles = [];
let bufferLength = null;
let amp = null;
let pointHsl = 0;
let isChange = false;
let isStart = false;

const resize = () => {
  const ratio = 1; //devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  audioCtx = null;
  wave = [];
  analyser = null;
  particles = [];
  bufferLength = null;
  amp = null;
  isClick = false;
  pointHsl = 0;
  isChange = false;
};

let hsl = 0;

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (analyser) {
    analyser.getByteFrequencyData(wave);
  }

  if (isChange || amp > 210) {
    ctx.fillStyle = `hsl(${pointHsl}, 50%, 10%)`;
    isChange = true;
  } else {
    ctx.fillStyle = "#000";
  }

  ctx.beginPath();
  ctx.fillRect(0, 0, innerWidth, innerHeight);
  ctx.fill();
  ctx.closePath();

  ctx.save();

  ctx.translate(innerWidth / 2, innerHeight / 2);
  ctx.rotate((180 * Math.PI) / 180);

  let end = 180;

  ctx.fillStyle = `#f4fc0d`;
  ctx.beginPath();

  for (let t = -1; t <= 1; t += 2) {
    for (let i = 0; i <= end; i += 0.5) {
      const index = Math.floor(map(i, 0, end, 0, wave.length));
      const w = wave[index];
      const r = w + 10;

      const radius = (i * Math.PI) / 180;

      const x = Math.sin(radius) * 200 * t;
      const y = Math.cos(radius) * 200;

      const width = Math.sin(radius) * r * t;
      const height = Math.cos(radius) * 10;

      ctx.fillRect(x, y, width, height);
    }
  }

  ctx.fill();
  ctx.closePath();

  ctx.restore();

  ctx.save();

  ctx.translate(innerWidth * 0.2, innerHeight * 0.5);
  ctx.rotate((-90 * Math.PI) / 180);

  ctx.fillStyle = `#f00`;
  ctx.beginPath();

  for (let t = -1; t <= 1; t += 2) {
    for (let i = 0; i <= end; i += 0.5) {
      const index = Math.floor(map(i, 0, end, 0, wave.length));
      const w = wave[index];
      const r = w + 10;

      const radius = (i * Math.PI) / 180;

      const x = Math.sin(radius) * 200 * t;
      const y = Math.cos(radius) * 200;

      const width = Math.sin(radius) * r * t;
      const height = Math.cos(radius) * 10;

      ctx.fillRect(x, y, width, height);
    }
  }

  ctx.fill();
  ctx.closePath();

  ctx.restore();

  ctx.save();

  ctx.translate(innerWidth * 0.8, innerHeight * 0.5);
  ctx.rotate((90 * Math.PI) / 180);

  ctx.fillStyle = `#1c9`;
  ctx.beginPath();

  for (let t = -1; t <= 1; t += 2) {
    for (let i = 0; i <= end; i += 0.5) {
      const index = Math.floor(map(i, 0, end, 0, wave.length));
      const w = wave[index];
      const r = w + 10;

      const radius = (i * Math.PI) / 180;

      const x = Math.sin(radius) * 200 * t;
      const y = Math.cos(radius) * 200;

      const width = Math.sin(radius) * r * t;
      const height = Math.cos(radius) * 10;

      ctx.fillRect(x, y, width, height);
    }
  }

  ctx.fill();
  ctx.closePath();

  ctx.restore();

  amp = getEnergy(20, 200);

  const random = Math.random() * 360;
  const length = 200;
  const px = Math.cos(random) * length;
  const py = Math.sin(random) * length;

  const normalize = {
    x: px / length,
    y: py / length,
  };

  if (isClick) {
    const p = new Particle(px, py, normalize);
    particles.push(p);
  }

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];

    if (!particle.edges()) {
      particle.update(amp > 210);
      particle.draw(ctx, pointHsl, isStart);
    } else {
      particles.splice(i, 1);
    }

    if (!particle.isLife) {
      particles.splice(i, 1);
    }
  }

  hsl++;
  pointHsl++;

  requestAnimationFrame(animate);
};

const getEnergy = (low, high) => {
  if (audioCtx) {
    analyser.getByteFrequencyData(wave);

    const nyquist = audioCtx.sampleRate / 2;
    const lowIndex = Math.floor((low / nyquist) * bufferLength);
    const highIndex = Math.floor((high / nyquist) * bufferLength);

    let sum = 0;
    for (let i = lowIndex; i <= highIndex; i++) {
      sum += wave[i];
    }

    const averageEnergy = sum / (highIndex - lowIndex + 1);
    return averageEnergy;
  }
};

const onClick = () => {
  audioCtx = new AudioContext();

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  audio.volume = 0.3;
  audio.play();

  const source = audioCtx.createMediaElementSource(audio);

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;

  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  bufferLength = analyser.frequencyBinCount;

  wave = new Uint8Array(bufferLength);

  isClick = true;
};

audio.addEventListener("timeupdate", function () {
  if (audio.currentTime > 29.9) {
    isStart = true;
  }
});

resize();
animate();

window.addEventListener("click", onClick);
window.addEventListener("resize", resize);
