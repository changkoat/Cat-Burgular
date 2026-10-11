class WinScene extends ScreenScene {
  constructor() {
    super('The purrfect escape', [
      'All ' + LEVELS.length + ' heists complete. You made it!',
      'Final score: ' + Globals.score + ' points',
      'Start a new game to try all the levels again.'
    ], 'Play again');
  }

  primary() {
    if (SceneManager.nextScene) return;
    Globals.reset();
    Globals.go(BriefingScene);
  }
}
