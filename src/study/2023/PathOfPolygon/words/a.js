import { Common } from "./Common.js";

export class a extends Common {
  constructor() {
    super();

    this.passPoints = [2, 4, 6, 8];
    this.coord = [
      { x: 658, y: 620 },
      { type: "curve", x: 658, y: 660 },
      { x: 658, y: 690 },

      { type: "curve", x: 625, y: 698 },
      { x: 590, y: 690 },
      { type: "curve", x: 597, y: 660 },

      { x: 605, y: 620 },

      { type: "curve", x: 625, y: 616 },

      { x: 650, y: 630 },

      { x: 658, y: 660 },

      { x: 658, y: 696 },
    ];
  }
}
