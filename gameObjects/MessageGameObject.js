class MessageGameObject extends GameObject {
  constructor(text, size = 20, layer = 'UI', color = '#f6edda') {
    super('Message', { layer });
    this.addComponent(new TextLabel(), { text, font: size + 'px Trebuchet MS', fillStyle: color });
  }
}
