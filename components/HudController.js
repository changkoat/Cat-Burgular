class HudController extends Component {
  update() {
    const scene = this.gameObject.scene;
    // The HUD reads the current scene each frame but stays at a fixed screen position.
    const labels = {
      points: 'POINTS  ' + (scene.scoreAtStart + scene.points * 100),
      loot: 'LOOT  ' + scene.points + ' / ' + scene.loot.length,
      level: 'LEVEL  ' + (Globals.levelIndex + 1) + ' / ' + LEVELS.length,
      objective: scene.state === 'paused' ? 'PAUSED — Resume when you are ready.' :
        scene.points === scene.loot.length ? 'All loot collected! Reach the green exit.' :
        'Collect every diamond. Avoid the guards.'
    };
    this.gameObject.getComponent(TextLabel).text = labels[this.kind];
  }
}
