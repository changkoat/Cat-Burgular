class WallGameObject extends GameObject {
  constructor(width, height) {
    super('Wall');
    this.w = width;
    this.h = height;
    this.addComponent(new Polygon(), {
      points: [new Vector2(0, 0), new Vector2(width, 0), new Vector2(width, height), new Vector2(0, height)],
      fillStyle: '#88704f', strokeStyle: '#b39a6c', lineWidth: 3
    });
  }
}
