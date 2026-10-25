class Input {
  static keysDown = [];
  static keysDownThisFrame = [];
  static keysUpThisFrame = [];

  static keyDown(event) {
    if (!Input.keysDown.includes(event.code)) {
      Input.keysDown.push(event.code);
      Input.keysDownThisFrame.push(event.code);
    }
  }

  static keyUp(event) {
    Input.keysDown = Input.keysDown.filter(code => code !== event.code);
    Input.keysUpThisFrame.push(event.code);
  }

  static mouseDown() {}
  static mouseUp() {}

  static update() {
    Input.keysDownThisFrame = [];
    Input.keysUpThisFrame = [];
  }
}
