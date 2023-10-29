import { Util } from "./Util.js";
import { RayCasting } from "./RayCasting.js";
import { Cover } from "./Cover.js";

export class Front {
  constructor(point) {
    this.point = point;
    this.pointCopy = new Cover(point).point;
    this.u = new Util();
    this.rayCasting = new RayCasting(point);
  }

  update(mouse, ctx) {
    const { moveX, moveY } = mouse;

    const edgePoint = this.pointCopy[1];

    const distance = this.u.dist(edgePoint, { x: moveX, y: moveY });
    let x1, y1;
    let x2, y2;
    let x3, y3;

    let x13, y13;
    let x23, y23;

    const p1 = this.pointCopy[0];
    const p2 = this.pointCopy[1];
    const p3 = this.pointCopy[2];

    const angle = Math.atan2(moveY - edgePoint.y, moveX - edgePoint.x);
    const angleOfDistance = Math.acos((moveX - edgePoint.x) / distance);
    const v = 1;

    if (moveX < edgePoint.x && moveY > edgePoint.y) {
      const time = distance / (p2.x - p1.x);
      const a1 = angle + angleOfDistance * v;
      const minAngle = 20;

      x1 = this.u.lerp(p1.x, p2.x, 1 - time);
      y1 = this.u.lerp(p1.y, p2.y, 1 - time);

      x2 = this.u.lerp(p3.x, p2.x, 1 - time);
      y2 = this.u.lerp(p3.y, p2.y, 1 - time);

      x3 = edgePoint.x - Math.cos(a1) * distance;
      y3 = edgePoint.y - Math.sin(a1) * distance;

      x13 = this.u.lerp(x1, x3, 0.2) + (minAngle - time);
      y13 = this.u.lerp(y1, y3, 0.5);

      x23 = this.u.lerp(x2, x3, 0.7);
      y23 = this.u.lerp(y2, y3, 0.5) - (minAngle - time);
    }

    ctx.fillStyle = "blue";
    ctx.beginPath();

    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x13, y13, x3, y3);
    ctx.quadraticCurveTo(x23, y23, x2, y2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x1, y1, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x13, y13, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x2, y2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x23, y23, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x3, y3, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  draw(ctx) {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(this.point[0].x, this.point[0].y);

    for (let i = 1; i < this.point.length; i++) {
      const p = this.point[i];

      ctx.lineTo(p.x, p.y);
    }

    ctx.fill();
    ctx.closePath();
  }
}
