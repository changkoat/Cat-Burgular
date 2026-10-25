class LootGameObject extends GameObject {
  constructor() {
    super('Loot');
    this.w = this.h = 20;
    this.addComponent(new SpriteController('loot'));
  }
}
