class Vector2 {
  constructor(x = 0, y = 0) { this.x = x; this.y = y; }
  add(other) { return new Vector2(this.x + other.x, this.y + other.y); }
  minus(other) { return new Vector2(this.x - other.x, this.y - other.y); }
  times(amount) { return new Vector2(this.x * amount, this.y * amount); }
  dot(other) { return this.x * other.x + this.y * other.y; }
  orthogonal() { return new Vector2(-this.y, this.x); }
  clone() { return new Vector2(this.x, this.y); }
  get magnitude() { return Math.hypot(this.x, this.y); }
  normalized() { return this.magnitude ? this.times(1 / this.magnitude) : new Vector2(); }
}
