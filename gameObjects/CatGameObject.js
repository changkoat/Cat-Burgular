class CatGameObject extends GameObject {
  constructor() {
    super('Cat');
    this.w = this.h = 28;
    this.addComponent(new SpriteController('cat'));
    this.addComponent(new CatController());
  }
}
