import { a } from "./words/a.js";
import { c } from "./words/c.js";
import { r } from "./words/r.js";
import { e } from "./words/e.js";
import { e2 } from "./words/e2.js";
import { t } from "./words/t.js";
import { i } from "./words/i.js";
import { i2 } from "./words/i2.js";
import { v } from "./words/v.js";
import { d } from "./words/d.js";
import { o } from "./words/o.js";
import { n } from "./words/n.js";
import { BigA } from "./words/BigA.js";
import { BigC } from "./words/BigC.js";

export class Alphabet {
  constructor(alphabet) {
    this.alphabet = alphabet;
  }

  draw() {
    if (this.alphabet === "A") {
      return new BigA();
    }

    if (this.alphabet === "C") {
      return new BigC();
    }

    if (this.alphabet === "a") {
      return new a();
    }

    if (this.alphabet === "c") {
      return new c();
    }

    if (this.alphabet === "r") {
      return new r();
    }

    if (this.alphabet === "e") {
      return new e();
    }

    if (this.alphabet === "e2") {
      return new e2();
    }

    if (this.alphabet === "t") {
      return new t();
    }

    if (this.alphabet === "i") {
      return new i();
    }

    if (this.alphabet === "i2") {
      return new i2();
    }

    if (this.alphabet === "v") {
      return new v();
    }

    if (this.alphabet === "d") {
      return new d();
    }

    if (this.alphabet === "o") {
      return new o();
    }

    if (this.alphabet === "n") {
      return new n();
    }
  }
}
