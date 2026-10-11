class GameOverScene extends ScreenScene {
  constructor() {
    super('Caught in the act!', [
      Globals.lossReason || 'The guard found you in ' + LEVELS[Globals.levelIndex].name + '.',
      'This attempt: ' + Globals.lastLoot + ' loot collected.',
      'Saved points from earlier levels: ' + Globals.score,
      'Retry this level. Unsecured loot does not count.'
    ], 'Retry level');
  }

  primary() { Globals.go(MainScene); }

  update() {
    if (Input.keysDownThisFrame.includes('KeyR')) this.primary();
    super.update();
  }
}
