import { Word } from "./Word.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mouse = {
  isClick: false,
};
let a, c, e, r, t, i, v, e2, d, i2, o, n;
let clickTimeStamp = 0;

let bigA, bigC;

let test = 1;

const resize = () => {
  const ratio = devicePixelRatio;

  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.scale(ratio, ratio);

  // false
  const isImage = true;
  // true

  bigA = new Word({
    text: "A",
    isImage: isImage,
    color: "#bb254a",
    test: 2,
  });

  bigC = new Word({
    text: "C",
    isImage: isImage,
    color: "#bb254a",
    test: 2,
  });

  a = new Word({
    text: "a",
    isImage: isImage,
    color: "#0e7987",
  });

  c = new Word({
    text: "c",
    isImage: isImage,
    color: "#675b28",
  });

  e = new Word({
    text: "e",
    isImage: isImage,
    color: "#806062",
  });

  e2 = new Word({
    text: "e2",
    isImage: isImage,
    color: "#4e6765",
  });

  r = new Word({
    text: "r",
    isImage: isImage,
    color: "#75466b",
  });

  t = new Word({
    text: "t",
    isImage: isImage,
    color: "#bb254a",
  });

  i = new Word({
    text: "i",
    isImage: isImage,
    color: "#5d2b35",
  });

  i2 = new Word({
    text: "i2",
    isImage: isImage,
    color: "#353641",
  });

  v = new Word({
    text: "v",
    isImage: isImage,
    color: "#f38138",
  });

  d = new Word({
    text: "d",
    isImage: isImage,
    color: "#939597",
  });

  o = new Word({
    text: "o",
    isImage: isImage,
    color: "#f6d2ce",
  });

  n = new Word({
    text: "n",
    isImage: isImage,
    color: "#7a3c31",
  });
};

const onClick = () => {
  mouse.isClick = true;

  clickTimeStamp = performance.now();
};

const animate = (time) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const fontSize = test === 1 ? 180 : 70; // const fontSize = 180;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${fontSize}px helvetica`;
  const x = window.innerWidth * 0.5;
  const positionY = test === 1 ? 0.5 : 0.7;
  const y = window.innerHeight * positionY;
  ctx.fillStyle = "#000";

  const myText = test === 1 ? "Creative Dion" : test === 2 ? "A" : "C";
  ctx.fillText(myText, x, y);

  if (mouse.isClick) {
    const deltaTime = Math.abs(time - clickTimeStamp);

    if (test === 1) {
      a.update(ctx, deltaTime);
      c.update(ctx, deltaTime);
      r.update(ctx, deltaTime);
      e.update(ctx, deltaTime);
      e2.update(ctx, deltaTime);
      t.update(ctx, deltaTime);
      i.update(ctx, deltaTime);
      i2.update(ctx, deltaTime);
      v.update(ctx, deltaTime);
      d.update(ctx, deltaTime);
      o.update(ctx, deltaTime);
      n.update(ctx, deltaTime);
    } else if (test === 2) {
      bigA.update(ctx, deltaTime);
    } else {
      bigC.update(ctx, deltaTime);
    }
  }

  // bigA.draw(ctx);
  // bigC.draw(ctx);
  // a.draw(ctx);
  // c.draw(ctx);
  // e.draw(ctx);
  // e2.draw(ctx);
  // r.draw(ctx);
  // t.draw(ctx);
  // i.draw(ctx);
  // i2.draw(ctx);
  // v.draw(ctx);
  // d.draw(ctx);
  // o.draw(ctx);
  // n.draw(ctx);

  requestAnimationFrame((time) => animate(time));
};

resize();
animate();

window.addEventListener("click", onClick);
window.addEventListener("resize", resize);
