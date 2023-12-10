export class PointPosition {
  constructor(x, y, offsetX, lineWidth, shdowBlur, color, darkColor, diagonal) {
    this.x = x;
    this.y = y;
    this.offsetX = offsetX;
    this.lineWidth = lineWidth;
    this.shdowBlur = shdowBlur;

    this.width = 205;
    this.height = 560;
    this.diagonal = diagonal;
    this.color = color;
    this.darkColor = darkColor;

    const x1 = this.x - this.width / 2;
    const y1 = this.y - this.height / 2;

    const x2 = this.x + this.width / 2;
    const y2 = this.y + this.height / 2;

    const time = 0;

    this.point = [
      {
        x: x1 + this.offsetX,
        y: y2 + this.diagonal,
        cx: x1 + this.offsetX,
        cy: y2 + this.diagonal,
        t: time,
        lineWidth: this.lineWidth,
        shdowBlur: this.shdowBlur,
        color: this.darkColor,
        vx: 0,
        vy: 0,
        composite: "destination-over",
      },
      {
        x: x1 + this.offsetX,
        y: y1,
        cx: x1 + this.offsetX,
        cy: y1,
        t: time,
        lineWidth: this.lineWidth,
        shdowBlur: this.shdowBlur,
        color: this.color,
        vx: 0,
        vy: 0,
      },
      {
        x: x2 + this.offsetX,
        y: y2 + 16 - this.diagonal,
        cx: x2 + this.offsetX,
        cy: y2,
        t: time,
        lineWidth: this.lineWidth,
        shdowBlur: this.shdowBlur,
        color: this.darkColor,
        vx: 0,
        vy: 0,
        composite: "destination-over",
      },
      {
        x: x2 + this.offsetX,
        y: y1,
      },
    ];
  }
}
