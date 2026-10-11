class GuardController extends Component {
  direction = 1;

  update() {
    if (this.gameObject.scene.state !== 'playing') return;
    const position = this.transform.position;
    position[this.axis] += this.direction * this.speed * Time.deltaTime;
    // Reverse direction when the guard reaches either end of its patrol.
    if (position[this.axis] >= this.max) { position[this.axis] = this.max; this.direction = -1; }
    if (position[this.axis] <= this.min) { position[this.axis] = this.min; this.direction = 1; }
  }
}
