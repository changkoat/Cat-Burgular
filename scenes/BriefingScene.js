class BriefingScene extends ScreenScene {
  constructor() {
    super('Tonight’s plan', [
      'Sneak in, fill your pockets, and find the exit.',
      'First stop: ' + LEVELS[0].name + '.',
      LEVELS[0].hint,
      'Your points are saved each time you escape a level.'
    ], 'Start heist');
  }

  primary() { Globals.go(MainScene); }
}
