import { Common } from "./Common.js";
import { Util } from "../Util.js";

export class e extends Common {
  constructor() {
    super();

    const u = new Util();

    this.passPoints = [2, 4, 6, 8];
    this.coord = [
      { x: 495, y: 655 },
      { type: "curve", x: 563, y: 655 },

      { x: 560, y: 617 },

      { type: "curve", x: 530, y: 617 },

      { x: 500, y: 617 },

      { type: "curve", x: 495, y: 655 },

      { x: 500, y: 695 },

      { type: "curve", x: 530, y: 695 },

      { x: 550, y: 695 },

      { x: 558, y: 681 },
    ];
  }
}
