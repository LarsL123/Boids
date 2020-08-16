class Boid {
  constructor(x, y, vx, vy) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(vx, vy);
  }

  drawBoid(ctx) {
    const rotationAngle = Math.atan2(this.velocity.y, this.velocity.x);

    const { x, y } = this.position;

    ctx.translate(x, y);
    ctx.rotate(rotationAngle);
    ctx.translate(-x, -y);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 15, y + 5);
    ctx.lineTo(x - 15, y - 5);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.closePath();

    ctx.setTransform(1, 0, 0, 1, 0, 0); //Reset canvas
  }
}
