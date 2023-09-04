import { Common } from "./Common.js";

export class r extends Common {
  constructor() {
    super();

    this.passPoints = [2];
    this.coord = [
      { x: 433, y: 615 },
      { type: "curve", x: 433, y: 695 },
      { x: 433, y: 635 },
      { x: 470, y: 620 },
    ];
  }
}
