export class Hill {
    constructor(x, y, radius, index) {
        this.x = x;
        this.y = y;
        this.offsetY = y;
        this.index = index;
        this.radius = radius;
        this.MAX = 100;
        this.angle = Math.PI / 2;
    }
    update() {
        this.y = this.offsetY + Math.sin(this.angle * this.index) * this.MAX;
    }
}
