export const distance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance;
};

export const maxDetect = (x1, y1, x2, y2, cx, cy, r) => {
  const length = distance(x1, y1, x2, y2);
  const vec1 = {
    x: cx - x1,
    y: cy - y1,
  };
  const vec2 = {
    x: x2 - x1,
    y: y2 - y1,
  };

  const projection = (vec1.x * vec2.x + vec1.y * vec2.y) / Math.pow(length, 2);
  const pro = projection < 0 || projection > 1 ? 0.5 : projection;

  const px = x1 + pro * vec2.x;
  const py = y1 + pro * vec2.y;

  const dist = distance(cx, cy, px, py);

  return {
    detect: dist < r ? true : false,
    point: {
      x: Math.floor(px),
      y: Math.floor(py),
    },
  };
};
