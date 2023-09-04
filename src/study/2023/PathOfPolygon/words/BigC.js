import { Common } from "./Common.js";
import { Util } from "../Util.js";

export class BigC extends Common {
  constructor() {
    super();

    const u = new Util();

    this.passPoints = [1, 3, 5, 7];
    this.coord = [
      {
        type: "curve",
        x: window.innerWidth * 0.5 + 200,
        y: window.innerHeight * 0.5 - 150,
      },
      { x: window.innerWidth * 0.5 + 200, y: window.innerHeight * 0.5 - 300 },
      {
        type: "curve",
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5 - 300,
      },

      { x: window.innerWidth * 0.5 - 200, y: window.innerHeight * 0.5 - 300 },
      {
        type: "curve",
        x: window.innerWidth * 0.5 - 200,
        y: window.innerHeight * 0.5,
      },

      { x: window.innerWidth * 0.5 - 200, y: window.innerHeight * 0.5 + 300 },

      {
        type: "curve",
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.5 + 300,
      },

      { x: window.innerWidth * 0.5 + 200, y: window.innerHeight * 0.5 + 300 },
      { x: window.innerWidth * 0.5 + 200, y: window.innerHeight * 0.5 + 150 },
    ];
  }
}
