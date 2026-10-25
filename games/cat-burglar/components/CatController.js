class CatController extends Component {
  speed = 221;

  update() {
    const scene = this.gameObject.scene;
    if (Input.keysDownThisFrame.includes('KeyM')) { Globals.go(MenuScene); return; }
    if (Input.keysDownThisFrame.includes('KeyR')) { scene.restart(); return; }
    if (Input.keysDownThisFrame.includes('Escape')) { scene.primary(); return; }
    if (scene.state !== 'playing') return;

    let x = 0, y = 0;
    if (Input.keysDown.includes('KeyD') || Input.keysDown.includes('ArrowRight')) x++;
    if (Input.keysDown.includes('KeyA') || Input.keysDown.includes('ArrowLeft')) x--;
    if (Input.keysDown.includes('KeyS') || Input.keysDown.includes('ArrowDown')) y++;
    if (Input.keysDown.includes('KeyW') || Input.keysDown.includes('ArrowUp')) y--;
    // Divide by the direction length so diagonal movement is not faster.
    const length = Math.hypot(x, y);
    if (length > 0) {
      this.move('x', x / length * this.speed * Time.deltaTime);
      this.move('y', y / length * this.speed * Time.deltaTime);
    }
    if (scene.guards.some(guard => scene.overlaps(this.gameObject, guard))) {
      scene.finish(false); return;
    }
    for (const item of scene.loot) {
      if (!item.markForDestroy && scene.overlaps(this.gameObject, item)) {
        item.destroy(); scene.points++;
      }
    }
  }

  move(axis, distance) {
    // Move one axis at a time so the cat can slide along a crate.
    const position = this.transform.position;
    const previous = position[axis];
    position[axis] += distance;
    const level = this.gameObject.scene.level;
    position.x = Math.max(24, Math.min(level.width - this.gameObject.w - 24, position.x));
    position.y = Math.max(24, Math.min(level.height - this.gameObject.h - 24, position.y));
    if (this.gameObject.scene.walls.some(wall => this.gameObject.scene.overlaps(this.gameObject, wall))) {
      position[axis] = previous;
    }
  }
}
