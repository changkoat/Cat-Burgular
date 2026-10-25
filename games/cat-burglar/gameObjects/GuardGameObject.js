class GuardGameObject extends GameObject {
  constructor(patrol) {
    super('Guard');
    this.w = this.h = 28;
    this.addComponent(new SpriteController('guard'));
    this.addComponent(new GuardController(), { ...patrol, speed: patrol.speed * 1.5 });
  }
}
