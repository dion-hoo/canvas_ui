import { Common } from "./Common.js";
import { Util } from "../Util.js";

export class BigA extends Common {
  constructor() {
    super();

    const u = new Util();

    this.exceptPoints = [4];
    this.coord = [
      { x: 660, y: 840 },
      { x: u.lerp(660, 855, 0.5), y: u.lerp(840, 350, 0.5) },
      { x: 855, y: 350 },
      { x: u.lerp(855, 1050, 0.5), y: u.lerp(350, 840, 0.5) },
      { x: 1050, y: 840 },

      { x: u.lerp(660, 855, 0.5), y: u.lerp(840, 350, 0.5) },
      { x: u.lerp(855, 1050, 0.5), y: u.lerp(350, 840, 0.5) },
    ];
  }
}
