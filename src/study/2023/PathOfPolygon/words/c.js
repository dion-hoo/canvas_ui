import { Common } from "./Common.js";

export class c extends Common {
  constructor() {
    super();

    this.passPoints = [1, 3, 5, 7, 9];
    this.coord = [
      { type: "curve", x: 385, y: 605 },

      { x: 378, y: 583 },
      { type: "curve", x: 345, y: 580 },
      { x: 308, y: 590 },

      { type: "curve", x: 304, y: 614 },
      { x: 296, y: 635 },
      { type: "curve", x: 305, y: 665 },

      { x: 320, y: 690 },

      { type: "curve", x: 345, y: 693 },

      { x: 370, y: 690 },

      { x: 385, y: 670 },
    ];
  }
}
