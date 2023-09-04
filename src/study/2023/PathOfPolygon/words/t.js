import { Common } from "./Common.js";

export class t extends Common {
  constructor() {
    super();

    this.passPoints = [2];
    this.exceptPoints = [3];
    this.coord = [
      { x: 706, y: 590 },
      { type: "curve", x: 706, y: 670 },
      { x: 706, y: 710 },
      { x: 730, y: 690 },

      { x: 690, y: 618 },
      { x: 725, y: 618 },
    ];
  }
}
