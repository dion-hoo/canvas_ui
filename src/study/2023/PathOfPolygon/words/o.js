import { Common } from "./Common.js";

export class o extends Common {
  constructor() {
    super();

    this.passPoints = [1, 3, 5, 7];
    this.coord = [
      { type: "curve", x: 1275, y: 695 },
      { x: 1240, y: 695 },
      { type: "curve", x: 1238, y: 656 },

      { x: 1240, y: 617 },

      { type: "curve", x: 1275, y: 617 },

      { x: 1310, y: 617 },

      { type: "curve", x: 1310, y: 656 },
      { x: 1310, y: 695 },

      { x: 1275, y: 695 },
    ];
  }
}
