class ScreenScene extends Scene {
  constructor(title, lines, action, secondary = '') {
    super();
    this.state = 'screen';
    this.instantiate(new MessageGameObject('CAT BURGLAR', 14, 'UI', '#b5c9b9'), new Vector2(400, 85));
    this.instantiate(new MessageGameObject(title, 36), new Vector2(400, 145));
    const displayLines = [];
    // Break long instructions into lines that fit on the menu screen.
    for (const line of lines) {
      let row = '';
      for (const word of line.split(' ')) {
        if ((row + ' ' + word).trim().length > 64) { displayLines.push(row); row = ''; }
        row = (row + ' ' + word).trim();
      }
      displayLines.push(row);
    }
    displayLines.forEach((line, index) => {
      this.instantiate(new MessageGameObject(line), new Vector2(400, 200 + index * 30));
    });
    this.buttons = [{ label: action + ' [Enter]', key: 'Enter', x: 220, y: 440, w: 360, h: 36, action: () => this.primary() }];
    if (secondary) this.buttons.push({ label: secondary + ' [H]', key: 'KeyH', x: 180, y: 490, w: 200, h: 36, action: () => this.secondary() });
    this.instantiate(new MessageGameObject('M: return to menu', 13, 'UI', '#b5c9b9'), new Vector2(400, 550));
  }

  update() {
    super.update();
    // A queued scene change must not be triggered again by a second key press.
    if (SceneManager.nextScene) return;
    if (Input.keysDownThisFrame.includes('KeyM')) { Globals.go(MenuScene); return; }
    for (const button of this.buttons) {
      if (Input.keysDownThisFrame.includes(button.key)) { button.action(); break; }
    }
  }

  click(x, y) {
    if (SceneManager.nextScene) return;
    for (const button of this.buttons) {
      if (x >= button.x && x <= button.x + button.w && y >= button.y && y <= button.y + button.h) {
        button.action(); break;
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.setTransform(Engine.canvas.width / Globals.width, 0, 0, Engine.canvas.height / Globals.height, 0, 0);
    ctx.fillStyle = '#263f36'; ctx.fillRect(0, 0, 800, 560);
    ctx.fillStyle = '#304d3e'; ctx.fillRect(40, 35, 720, 500);
    ctx.textAlign = 'center';
    super.draw(ctx);
    ctx.font = '18px Trebuchet MS';
    for (const button of this.buttons) {
      ctx.fillStyle = '#f4ce67'; ctx.fillRect(button.x, button.y, button.w, button.h);
      ctx.fillStyle = '#182c27'; ctx.fillText(button.label, button.x + button.w / 2, button.y + 24);
    }
    ctx.restore();
  }
}
