class Time {
  static deltaTime = 1 / 60;
  static time = 0;
  static lastTimestamp;

  static tick(timestamp) {
    this.deltaTime = this.lastTimestamp === undefined ? 1 / 60 :
      Math.max(0, Math.min(1 / 60, (timestamp - this.lastTimestamp) / 1000));
    this.lastTimestamp = timestamp;
    this.time += this.deltaTime;
  }
}
