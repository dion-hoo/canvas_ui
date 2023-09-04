import { Common } from "./Common.js";

export class n extends Common {
  constructor() {
    super();

    this.passPoints = [3];
    this.exceptPoints = [1];
    this.coord = [
      { x: 1354, y: 618 },
      { x: 1354, y: 694 },
      { type: "curve", x: 1354, y: 640 },
      { x: 1395, y: 595 },
      { x: 1415, y: 640 },
      { x: 1415, y: 694 },
    ];
  }
}
