class TrapGameObject extends GameObject {
  constructor(kind) {
    super('Trap');
    this.kind = kind;
    this.w = this.h = 48;
    this.addComponent(new TrapController());
  }

  static populate(scene) {
    const candidates = [];
    // Leave clear space around the spawn and exit so a new attempt starts fairly.
    const spawn = { transform: { position: new Vector2(scene.level.cat[0] - 65, scene.level.cat[1] - 65) }, w: 158, h: 158 };
    const exit = { transform: { position: new Vector2(scene.level.exit[0] - 24, scene.level.exit[1] - 24) }, w: 102, h: 102 };
    for (let y = 40; y <= scene.level.height - 88; y += 64) {
      for (let x = 40; x <= scene.level.width - 88; x += 64) {
        const area = { transform: { position: new Vector2(x - 8, y - 8) }, w: 64, h: 64 };
        if (![spawn, exit, ...scene.walls].some(obstacle => scene.overlaps(area, obstacle))) candidates.push([x, y]);
      }
    }
    // Shuffle clear floor positions on each attempt. Traps never block movement.
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    const kinds = ['snap', 'pot', 'mat'];
    return candidates.slice(0, 4 + Globals.levelIndex).map(([x, y], i) =>
      scene.instantiate(new TrapGameObject(kinds[i % kinds.length]), new Vector2(x, y)));
  }
}
