export class EventHandlers {
  constructor(ball, guideLine) {
    this.mouse = {
      isDown: false,
      isStart: false,
      x: 0,
      y: 0,
    };
    this.touch = {
      x: 0,
      y: 0,
    };

    this.ball = ball;
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

  onClick(target) {
    //  target.classList.add("active");
  }

  onMove(event) {
    if (!this.mouse.isStart) {
      this.mouse.isDown = true;

      this.setMousePoint(event);
    }

    this.touch.x = event.clientX;
    this.touch.y = event.clientY;
  }

  onUp(event) {
    this.mouse.isStart = true;
    this.mouse.isDown = false;

    this.setMousePoint(event);

    this.ball.isSetRotateDirection = false;
  }

  registerEvents() {
    window.addEventListener("click", this.onClick.bind(this));
    window.addEventListener("pointermove", this.onMove.bind(this));
    window.addEventListener("pointerup", this.onUp.bind(this));
  }

  unregisterEvents() {
    window.removeEventListener("click", this.onClick.bind(this));
    window.removeEventListener("pointermove", this.onMove.bind(this));
    window.removeEventListener("pointerup", this.onUp.bind(this));
  }
}
