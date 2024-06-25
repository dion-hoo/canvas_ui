export const Projection = (ctx, x1, y1, x2, y2, targetX, targetY) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const vec1 = {
    x: targetX - x1,
    y: targetY - y1,
  };

  const vec2 = {
    x: x2 - x1,
    y: y2 - y1,
  };

  const result = (vec1.x * vec2.x + vec1.y * vec2.y) / Math.pow(distance, 2);

  const x = x1 + result * vec2.x;
  const y = y1 + result * vec2.y;

  const detectX = targetX - x;
  const detectY = targetY - y;
  const detectDistance = Math.sqrt(detectX * detectX + detectY * detectY);

  // if (detectDistance < 200) {
  //   ctx.save();
  //   ctx.fillStyle = "red";
  //   ctx.beginPath();
  //   ctx.arc(x, y, 10, 0, Math.PI * 2);
  //   ctx.fill();
  //   ctx.closePath();
  //   ctx.restore();
  // }

  const isDetect = x1 < x && detectDistance < 200 && x < x2;

  return {
    x,
    y,
    detectDistance,
    detect: isDetect,
  };
};
