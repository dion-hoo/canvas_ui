import { Point } from "./Point.js";

export class Hoop extends Point {
  constructor(isFixed, x, y, radius, color) {
    super(isFixed, x, y, radius, color);

    this.hoopDistance = {
      cloest: null, // 가장 가까운 인덱스스
      next: null, // 바로 다음 인덱스
      inverse: null, // 역 인덱스
    };
  }
}
