import { Pattern } from "./Pattern.js";
import { CreateImage } from "./CreateImage.js";
import { Alphabet } from "./Alphabet.js";

export class Word {
  constructor(info) {
    this.text = info.text;
    this.isImage = info.isImage;
    this.color = info.color;
    this.test = info.test ?? 1;

    this.points = [];
    this.index = 0;
    this.prevIndex = 0;
    this.ratio = 0;

    this.fps = this.test === 1 ? (this.isImage ? 4 : 40) : 10;
    this.time = 150;
    this.fpsTime = this.time / this.fps;

    this.image = new CreateImage();

    const alphabet = new Alphabet(this.text);
    const { coord, exceptPoints, passPoints } = alphabet.draw();

    this.word = coord;
    this.passPoints = passPoints;
    this.exceptPoints = exceptPoints;
    this.exceptIndex = [];
    this.totalCount = 0;
  }

  update(ctx, t) {
    if (!this.prevTime) {
      this.prevTime = t;
    }

    if (this.init === undefined) {
      this.init = true;
    }

    const now = t - this.prevTime;
    const pathLength = this.word.length - 1;
    if (this.init || (now > this.fpsTime && this.index < pathLength)) {
      this.init = false;
      this.prevTime = t;
      this.ratio = t / this.time;

      // index update
      if (parseInt(this.ratio) > this.prevIndex) {
        this.index++;
        this.prevIndex++;
      }

      // pass point
      if (this.passPoints.includes(this.index)) {
        this.index++;
      }

      // except point
      if (this.exceptPoints.includes(this.index)) {
        this.exceptIndex.push(this.totalCount);
        this.index++;
      }

      this.totalCount++;

      if (this.index >= pathLength) {
        this.points.push({
          x: this.word[pathLength].x,
          y: this.word[pathLength].y,
        });

        return false;
      }

      const pattern = new Pattern(this.index, this.word);

      this.points.push(pattern.draw(this.ratio));
    }

    this.drawPath(ctx);
  }

  drawPath(ctx) {
    for (let i = 0; i < this.points.length; i++) {
      const cx = this.points[i].x;
      const cy = this.points[i].y;

      if (this.isImage) {
        this.image.draw(ctx, cx, cy);
      } else {
        ctx.beginPath();

        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.imageSmoothingEnabled = true;

        const exceptIndex = this.exceptIndex.includes(i);

        const index = i - 1 < 0 || exceptIndex ? i : i - 1;

        if (this.test === 1) {
          ctx.lineWidth = 15;
          ctx.strokeStyle = this.color;

          ctx.moveTo(this.points[index].x, this.points[index].y);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        } else {
          ctx.lineWidth = 50;
          ctx.strokeStyle = this.color;
          ctx.moveTo(this.points[index].x, this.points[index].y);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        }

        ctx.closePath();
      }
    }
  }

  draw(ctx) {
    // path;
    ctx.fillStyle = "red";
    ctx.beginPath();
    for (let i = 0; i < this.word.length; i++) {
      const w = this.word[i];
      ctx.arc(w.x, w.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }
}
