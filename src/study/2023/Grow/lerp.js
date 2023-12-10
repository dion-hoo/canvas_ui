export class Lerp {
  constructor() {}

  get(j, k, r) {
    return j * (1 - r) + k * r;
  }
}
