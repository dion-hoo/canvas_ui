export class StringAudio {
  constructor() {
    this.audioList = [];
  }

  play(index) {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    const music = this.audioList[index % this.audioList.length];

    this.audio = new Audio(music);
    this.audio.volume = 0.5;
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }
}
