class DoorGameObject extends GameObject {
  constructor(width = 54, height = 54) {
    super('Door');
    this.w = width;
    this.h = height;
    this.addComponent(new DoorController());
  }

  get unlocked() {
    return this.scene.points === this.scene.loot.length;
  }
}
