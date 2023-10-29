export class Video {
  constructor(video) {
    this.video = video;
    this.isLoad = false;
  }

  draw(ctx) {
    this.video.addEventListener("play", () => {
      this.isLoad = true;
    });

    if (this.isLoad) {
      if (this.video.paused || this.video.ended) return;

      ctx.save();
      ctx.globalCompositeOperation = "xor";

      ctx.fillStyle = "rgba(255, 0, 0, 0.84)";
      ctx.beginPath();
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.fill();
      ctx.closePath();

      ctx.drawImage(this.video, 0, 0, innerWidth, innerHeight);
      ctx.restore();
    }
  }
}
