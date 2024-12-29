export const getDistance = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const distance = Math.hypot(dx, dy);

  return {
    dx,
    dy,
    distance,
  };
};

export const getDistance2 = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.hypot(dx, dy);

  return {
    dx,
    dy,
    distance,
  };
};

export const raycasting = (target, point) => {
  let isInside = false;
  for (let i = 0, j = point.length - 1; i < point.length; j = i++) {
    const r1 = point[i];
    const r2 = point[j];

    const x =
      target.x < r1.x + ((target.y - r1.y) / (r2.y - r1.y)) * (r2.x - r1.x);
    const y = target.y < r1.y !== target.y < r2.y;

    const intersect = x && y;

    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
};

export const projection = (p, d1, d2) => {
  const v1 = {
    x: p.x - d1.x,
    y: p.y - d1.y,
  };

  const v2 = {
    x: d2.x - d1.x,
    y: d2.y - d1.y,
  };

  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag = v2.x * v2.x + v2.y * v2.y;
  const scale = Math.max(0, Math.min(1, dot / mag));

  const proj = {
    x: d1.x + scale * v2.x,
    y: d1.y + scale * v2.y,
  };

  return {
    x: proj.x,
    y: proj.y,
  };
};
