class LootBagGameObject extends GameObject {
  constructor() {
    super('Cat loot bag');
    this.w = 14;
    this.h = 18;
    this.addComponent(new LootBagController());
  }
}
