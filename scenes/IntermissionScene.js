class IntermissionScene extends ScreenScene {
  constructor() {
    const next = LEVELS[Globals.levelIndex + 1];
    super('A clean getaway', [
      LEVELS[Globals.levelIndex].name + ' complete!',
      'Loot secured: ' + Globals.lastLoot + '  •  +' + Globals.lastLoot * 100 + ' points',
      'Total points: ' + Globals.score,
      'Up next: ' + next.name,
      next.hint
    ], 'Next level');
  }

  primary() {
    if (SceneManager.nextScene) return;
    Globals.levelIndex++;
    Globals.go(MainScene);
  }
}
