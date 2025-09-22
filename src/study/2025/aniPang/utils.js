export const getDistance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.hypot(dx, dy);

  const normal = {
    x: dx / distance,
    y: dy / distance,
  };

  return {
    dx,
    dy,
    normal,
    distance,
  };
};
