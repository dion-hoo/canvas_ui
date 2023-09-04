import { Common } from "./Common.js";

export class d extends Common {
  constructor() {
    super();

    this.passPoints = [4, 6, 8];
    this.exceptPoints = [1];
    this.coord = [
      { x: 1065, y: 583 },
      { x: 1065, y: 690 },
      { x: 1065, y: 583 },

      { type: "curve", x: 1100, y: 583 },
      { x: 1130, y: 584 },
      { type: "curve", x: 1144, y: 610 },

      { x: 1155, y: 636.5 },

      { type: "curve", x: 1144, y: 663 },
      { x: 1130, y: 692 },

      { x: 1100, y: 690 },
      { x: 1065, y: 690 },
    ];
  }
}
