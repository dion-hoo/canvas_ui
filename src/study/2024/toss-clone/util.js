export const clamp = (ratio) => {
  return ratio < 0 ? 0 : ratio > 1 ? 1 : ratio;
};

export const ratioValue = (ratio, value) => {
  return value[0] + ratio * (value[1] - value[0]);
};

export const ratioMultipleValue = (firstRatio, secondRatio, property) => {
  const firstProperty = property.slice(0, 2);
  const secondProperty = property.slice(2);
  let result = 0;

  // 첫번째 애니메이션
  if (firstRatio < 1) {
    result = ratioValue(firstRatio, firstProperty);
  } else {
    // 두번째 애니메이션
    result = ratioValue(secondRatio, secondProperty);
  }

  return result;
};
