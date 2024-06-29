import { contentInfo } from "./content.js";
import { clamp, ratioValue, ratioMultipleValue } from "./util.js";

const cardList = document.querySelector(".card-list");
const cardItems = cardList.children;

for (let i = 0; i < cardItems.length; i++) {
  const item = cardItems[i];

  item.addEventListener("click", () => {
    item.classList.remove("hover");
    item.classList.toggle("flip");
  });

  item.addEventListener("pointerenter", () => {
    item.classList.add("hover");
  });

  item.addEventListener("pointerleave", () => {
    item.classList.remove("hover");
  });
}

const container = document.querySelector(".container");
const contents = container.children;

let currentScene = 0;
let preFrame = 0;

const setElementStyleOfEffect = ({
  target,
  clampRatio,
  firstRatio,
  secondRatio,
  effect,
  multiEffect = false,
}) => {
  for (const e in effect) {
    const property = effect[e];

    if (e === "transform") {
      for (const list in property) {
        const result = multiEffect
          ? ratioMultipleValue(firstRatio, secondRatio, property[list])
          : ratioValue(clampRatio, property[list]);

        if (list === "translate") {
          target.style[e] = `translate(-50%, calc(-50% + ${result}px)`;
        } else if (list === "rotateX") {
          target.style[e] = `scale(1.07) rotateX(${result}deg)`;
        } else if (list === "scale") {
          target.style[e] = `translateX(-50%) scale(${result})`;
        }
      }
    } else {
      const result = multiEffect
        ? ratioMultipleValue(firstRatio, secondRatio, property)
        : ratioValue(clampRatio, property);

      target.style[e] = result;
    }
  }
};

const setElementStyleOfProperty = (section, ratio) => {
  for (const key in section) {
    const sectionItem = section[key];
    const { end, start, target, effect } = sectionItem;

    if (typeof start === "object" && typeof end === "object") {
      const [firstStart, secondStart] = start;
      const [firstEnd, secondEnd] = end;

      const partFirstRatio = (ratio - firstStart) / (firstEnd - firstStart);
      const partSecondRatio = (ratio - secondStart) / (secondEnd - secondStart);

      const firstRatio = clamp(partFirstRatio);
      const secondRatio = clamp(partSecondRatio);

      setElementStyleOfEffect({
        target,
        firstRatio,
        secondRatio,
        effect,
        multiEffect: true,
      });
    } else {
      const partRatio = (ratio - start) / (end - start);
      const clampRatio = clamp(partRatio);

      setElementStyleOfEffect({
        target,
        clampRatio,
        effect,
      });
    }
  }
};

const onScroll = () => {
  preFrame = 0;
  for (let i = 0; i < currentScene; i++) {
    const content = contents[i];

    preFrame += content.clientHeight;
  }

  const frame = contents[currentScene];
  const currentFrame = scrollY - preFrame;

  if (currentFrame > frame.clientHeight) {
    currentScene++;

    return;
  }

  if (currentFrame < 0) {
    if (currentScene === 0) return;
    currentScene--;
  }

  // 화면 전체 비율
  const ratio = clamp(currentFrame / frame.clientHeight);
  const key = `section${currentScene + 1}`;

  // 현재 보이는 section
  const section = contentInfo[key];

  setElementStyleOfProperty(section, ratio);
};

window.addEventListener("scroll", onScroll);
