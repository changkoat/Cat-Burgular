class CreditsScene extends ScreenScene {
  constructor() {
    super('Credits', [
      'Cat Burglar — an intro game programming project.',
    ], 'Back to menu');
  }
  primary() { Globals.go(MenuScene); }
}
