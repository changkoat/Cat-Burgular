class InstructionsScene extends ScreenScene {
  constructor() {
    super('How to play', [
      'WASD or arrow keys move the cat.',
      'The camera follows you through each larger room.',
      'Gold diamonds are worth 100 points each.',
      'Collect them all, then walk into the green exit.',
      'Avoid red guards. Brown crates block your path.',
      'Watch for traps. Their warning flash gives you time to move.',
      'R restarts. Escape pauses. M returns to the menu.'
    ], 'Back to menu');
  }

  primary() { Globals.go(MenuScene); }
}
