import { Common } from "./Common.js";
import { Util } from "../Util.js";

export class e2 extends Common {
  constructor() {
    super();

    const u = new Util();

    this.passPoints = [2, 4, 6, 8];
    this.coord = [
      { x: 905, y: 655 },
      { type: "curve", x: 973, y: 655 },

      { x: 970, y: 617 },

      { type: "curve", x: 940, y: 617 },

      { x: 910, y: 617 },

      { type: "curve", x: 905, y: 655 },

      { x: 910, y: 695 },

      { type: "curve", x: 940, y: 695 },

      { x: 960, y: 695 },

      { x: 968, y: 681 },
    ];
  }
}
