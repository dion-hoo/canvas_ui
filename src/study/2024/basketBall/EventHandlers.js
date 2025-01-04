export class EventHandlers {
  constructor(ball, createBall, guideLine) {
    this.mouse = {
      isDown: false,
      isStart: false,
      x: null,
      y: null,
    };
    this.touch = {
      x: null,
      y: null,
    };

    this.ball = ball;
    this.createBall = createBall;
    this.guideLine = guideLine;
  }

  setMousePoint = (event) => {
    const dx = event.clientX - this.guideLine.x;
    const dy = event.clientY - this.guideLine.y;
    const dist = Math.hypot(dx, dy);
    const maxDist = innerHeight * 0.3;
    const isFar = dist > maxDist;

    const angle = Math.atan2(dy, dx);

    const x = this.guideLine.x + Math.cos(angle) * maxDist;
    const y = this.guideLine.y + Math.sin(angle) * maxDist;

    this.mouse.x = isFar ? x : event.clientX;
    this.mouse.y = isFar ? y : event.clientY;
  };

  onMove(event) {
    if (!this.mouse.isStart) {
      this.mouse.isDown = true;
    }

    this.setMousePoint(event);

    this.touch.x = event.clientX;
    this.touch.y = event.clientY;
  }

  onUp() {
    this.mouse.isStart = true;
    this.mouse.isDown = false;

    if (this.ball.length) {
      this.ball[this.ball.length - 1].isStart = true;
    }

    this.createBall();
  }

  registerEvents() {
    window.addEventListener("pointermove", this.onMove.bind(this));
    window.addEventListener("pointerup", this.onUp.bind(this));
  }

  unregisterEvents() {
    window.removeEventListener("pointermove", this.onMove.bind(this));
    window.removeEventListener("pointerup", this.onUp.bind(this));
  }
}
