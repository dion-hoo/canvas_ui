export class Christmas {
  constructor() {}

  setText(ctx, text) {
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.textRendering = "optimizeSpeed";

    const fontSize = innerWidth * 0.14;
    const x = innerWidth * 0.5;
    const y = innerHeight * 0.49;

    ctx.font = `700 ${fontSize}px Agbalumo`;

    ctx.fillText(text, x, y);

    const pixels = ctx.getImageData(0, 0, innerWidth, innerHeight);

    const gap = 5;
    const color = ["red", "blue", "green", "yellow"];
    this.particles = [];
    for (let y = 0; y < innerHeight; y += gap) {
      for (let x = 0; x < innerWidth; x += gap) {
        const alpha = pixels.data[y * innerWidth * 4 + 4 * x];

        if (alpha === 255) {
          const index = Math.floor(Math.random() * color.length);

          this.particles.push({
            x: x,
            y: y,
            vx: Math.random() * 1 - 0.5,
            color: color[index],
            touch: false,
          });
        }
      }
    }
  }

  draw(ctx, moveX, moveY) {
    this.particles.forEach((p) => {
      const dx = p.x - moveX;
      const dy = p.y - moveY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 20) {
        p.touch = true;
      }

      if (p.touch) {
        p.x += p.vx;
        p.y += 3;
        ctx.fillStyle = p.color;
      } else {
        ctx.fillStyle = "#fff";
      }

      ctx.font = `700 ${5}px Agbalumo`;

      ctx.fillText("O", p.x, p.y);
    });
  }
}
