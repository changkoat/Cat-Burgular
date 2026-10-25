class DoorController extends Component {
  update() {
    const door = this.gameObject;
    const scene = door.scene;
    if (scene.state !== 'playing' || !door.unlocked) return;
    if (GameCollisions.isCollisionPolygonPolygon(door, scene.cat)) {
      // finish handles scoring, loading the next level, and the final victory.
      scene.finish(true);
    }
  }

  draw(ctx) {
    const door = this.gameObject;
    const { w, h } = door;
    ctx.fillStyle = '#b39a6c';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = door.unlocked ? '#8cdbac' : '#d94840';
    ctx.fillRect(4, 4, w - 8, h - 4);
    ctx.strokeStyle = '#263f36'; ctx.lineWidth = 2;
    ctx.strokeRect(9, 9, w - 18, h - 17);
    ctx.fillStyle = '#f4ce67';
    ctx.fillRect(w - 13, h / 2, 5, 5);
  }
}
