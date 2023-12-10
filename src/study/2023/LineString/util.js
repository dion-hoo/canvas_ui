export const distance = (x1, y1, x2, y2) => {
  const x = x2 - x1;
  const y = y2 - y1;

  return Math.sqrt(x * x + y * y);
};

export const lineCircle = (x1, y1, x2, y2, cx, cy, r) => {
  const lineLenght = distance(x1, y1, x2, y2);
  const point =
    ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / Math.pow(lineLenght, 2); // 선분의 길이와 관계없이 하기 위해서 정규화 거친후 선분의 길이로 나눠 비율을 구함

  const px = x1 + point * (x2 - x1);
  const py = y1 + point * (y2 - y1);

  const dist = distance(px, py, cx, cy);

  if (dist < r) {
    return true;
  } else {
    return false;
  }
};
