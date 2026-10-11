class MenuScene extends ScreenScene {
  constructor() {
    super('Cat Burglar', [
      'Collect the loot and get out without being caught.'
    ], 'New game', 'How to play');
    this.buttons.push({ label: 'Credits [C]', key: 'KeyC', x: 420, y: 490, w: 200, h: 36, action: () => Globals.go(CreditsScene) });
  }

  primary() {
    if (SceneManager.nextScene) return;
    Globals.reset();
    Globals.go(BriefingScene);
  }

  secondary() { Globals.go(InstructionsScene); }
}
