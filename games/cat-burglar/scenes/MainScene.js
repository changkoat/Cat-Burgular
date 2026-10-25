class MainScene extends Scene {
  constructor() {
    super();
    this.level = LEVELS[Globals.levelIndex];
    this.points = 0;
    this.scoreAtStart = Globals.score;
    this.state = 'playing';
    Globals.lossReason = '';
    this.walls = this.level.walls.map(wall => this.instantiate(new WallGameObject(wall.w, wall.h), new Vector2(wall.x, wall.y)));
    this.traps = TrapGameObject.populate(this);
    // Guards update before the cat so catching uses their current positions.
    this.guards = this.level.guards.map(guard => this.instantiate(new GuardGameObject(guard), new Vector2(guard.x, guard.y)));
    this.loot = this.level.loot.map(([x, y]) => this.instantiate(new LootGameObject(), new Vector2(x, y)));
    this.cat = this.instantiate(new CatGameObject(), new Vector2(...this.level.cat));
    // The bag's position is local to the cat, so the engine moves it with its parent.
    this.cat.bag = this.instantiate(new LootBagGameObject(), new Vector2(20, 15));
    this.cat.bag.transform.setParent(this.cat.transform);
    this.exit = this.instantiate(new DoorGameObject(), new Vector2(...this.level.exit));
    this.instantiate(new HudGameObject('points'), new Vector2(26, 30));
    this.instantiate(new HudGameObject('loot'), new Vector2(290, 30));
    this.instantiate(new HudGameObject('level'), new Vector2(590, 30));
    this.instantiate(new HudGameObject('objective'), new Vector2(26, 61));
  }

  overlaps(a, b) {
    return GameCollisions.isCollisionPolygonPolygon(a, b);
  }

  restart() { Globals.go(MainScene); }

  primary() {
    this.state = this.state === 'playing' ? 'paused' : 'playing';
  }

  finish(won) {
    if (this.state !== 'playing') return;
    this.state = 'transition';
    Globals.lastLoot = this.points;
    if (won) {
      // Points become permanent only after the cat leaves the room successfully.
      Globals.score += this.points * 100;
      if (Globals.levelIndex === LEVELS.length - 1) {
        Globals.go(WinScene);
      } else {
        Globals.levelIndex++;
        Globals.go(MainScene);
      }
    } else {
      Globals.go(GameOverScene);
    }
  }

  click() {
    if (this.state === 'paused') this.primary();
  }

  getCamera() {
    const cat = this.cat.transform.position;
    // Center on the cat, but stop at the map edges so no empty space shows.
    return {
      x: Math.max(0, Math.min(this.level.width - 800, cat.x + this.cat.w / 2 - 400)),
      y: Math.max(0, Math.min(this.level.height - 480, cat.y + this.cat.h / 2 - 240))
    };
  }

  draw(ctx) {
    // Scale the visible window, then move only the world beneath its fixed HUD.
    ctx.save();
    ctx.setTransform(Engine.canvas.width / 800, 0, 0, Engine.canvas.height / 560, 0, 0);
    ctx.fillStyle = '#1c3027'; ctx.fillRect(0, 0, 800, 560);
    const camera = this.getCamera();
    ctx.save();
    // Clip the room below the HUD before shifting world coordinates.
    ctx.beginPath();
    ctx.rect(0, 80, 800, 480);
    ctx.clip();
    ctx.translate(-camera.x, 80 - camera.y);
    ctx.fillStyle = '#263f36'; ctx.fillRect(0, 0, this.level.width, this.level.height);
    ctx.fillStyle = '#354e42'; ctx.fillRect(24, 24, this.level.width - 48, this.level.height - 48);
    ctx.strokeStyle = '#3d5849'; ctx.lineWidth = 1;
    for (let x = 24; x < this.level.width - 24; x += 40) {
      for (let y = 24; y < this.level.height - 24; y += 40) {
        ctx.strokeRect(x, y, Math.min(40, this.level.width - 24 - x), Math.min(40, this.level.height - 24 - y));
      }
    }
    // Draw the room under the camera; draw the HUD after restoring the screen position.
    for (const object of this.gameObjects) {
      if (object.layer !== 'UI') object.draw(ctx);
    }
    ctx.restore();
    if (this.state === 'paused') {
      ctx.fillStyle = 'rgba(20, 35, 28, 0.86)'; ctx.fillRect(180, 187, 440, 100);
      ctx.fillStyle = '#faf1d9'; ctx.font = 'bold 28px Georgia'; ctx.textAlign = 'center';
      ctx.fillText('Taking a catnap.', 400, 230);
      ctx.font = '15px sans-serif'; ctx.fillText('Escape or click: resume · R: retry · M: menu', 400, 261);
    }
    ctx.textAlign = 'left';
    for (const object of this.gameObjects) {
      if (object.layer === 'UI') object.draw(ctx);
    }
    ctx.restore();
  }
}
