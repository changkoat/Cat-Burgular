class HudGameObject extends GameObject {
  constructor(kind) {
    super(kind + ' display', { layer: 'UI' });
    this.addComponent(new TextLabel(), {
      text: '', font: kind === 'objective' ? '15px Trebuchet MS' : 'bold 18px Trebuchet MS',
      fillStyle: kind === 'points' ? '#f4ce67' : '#f6edda'
    });
    this.addComponent(new HudController(), { kind });
  }
}
