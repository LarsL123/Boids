class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static add(vec1, vec2) {
    return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  static scale(vec, scaleFactor) {
    return new Vector2(vec.x * scaleFactor, vec.y * scaleFactor);
  }

  static divide(vec, divisor) {
    return new Vector2(vec.x / divisor, vec.y / divisor);
  }

  static distance(vec1, vec2) {
    return Math.sqrt(
      (vec2.x - vec1.x) * (vec2.x - vec1.x) +
        (vec2.y - vec1.y) * (vec2.y - vec1.y)
    );
  }

  distanceTo(other) {
    return Vector2.distance(this, other);
  }

  vectorTo(other) {
    return new Vector2(other.x - this.x, other.y - this.y);
  }

  add(other) {
    this.x = this.x + other.x;
    this.y = this.y + other.y;
    return this;
  }

  divide(divisor) {
    this.x /= divisor;
    this.y /= divisor;
    return this;
  }

  scale(scaleFactor) {
    this.x *= scaleFactor;
    this.y *= scaleFactor;
    return this;
  }

  clamp(minX, maxX, minY, maxY) {
    this.x = Math.max(this.x, minX);
    this.x = Math.min(this.x, maxX);

    this.y = Math.max(this.y, minY);
    this.y = Math.min(this.y, maxY);
    return this;
  }

  isNaN() {
    return isNaN(this.x) || isNaN(this.y);
  }

  magnetude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normelized() {
    const mag = this.magnetude();
    if (mag == 0) return new Vector2(this.x, this.y);
    return Vector2.divide(this, mag);
  }
}
