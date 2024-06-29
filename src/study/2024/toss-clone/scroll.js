import { contentInfo } from "./content.js";
import { clamp, ratioValue, ratioMultipleValue } from "./util.js";

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
    const properties = effect[e];

    if (e === "transform") {
      for (const property in properties) {
        const result = multiEffect
          ? ratioMultipleValue(firstRatio, secondRatio, properties[property])
          : ratioValue(clampRatio, properties[property]);

        if (property === "translate") {
          target.style[e] = `translate(-50%, calc(-50% + ${result}px)`;
        } else if (property === "rotateX") {
          target.style[e] = `scale(1.07) rotateX(${result}deg)`;
        } else if (property === "scale") {
          target.style[e] = `translateX(-50%) scale(${result})`;
        }
      }
    } else {
      const result = multiEffect
        ? ratioMultipleValue(firstRatio, secondRatio, properties)
        : ratioValue(clampRatio, properties);

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
