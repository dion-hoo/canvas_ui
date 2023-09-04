export class Common {
  constructor() {
    this.lineWidth = 2;

    // 직선을 그릴때 제외하는 벡터
    this.exceptPoints = [];

    // 커브를 그릴때 패스하는 벡터
    this.passPoints = [];
  }
}
