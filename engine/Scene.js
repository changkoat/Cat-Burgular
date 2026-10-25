class Scene {
  gameObjects = [];

  instantiate(object, position = new Vector2()) {
    object.scene = this;
    object.transform.position = position;
    this.gameObjects.push(object);
    return object;
  }

  start() {
    for (const object of this.gameObjects) object.start();
  }

  update() {
    for (const object of [...this.gameObjects]) {
      if (!object.markForDestroy) object.update();
      if (SceneManager.nextScene) break;
    }
    for (const object of this.gameObjects) {
      if (object.markForDestroy) object.sendMessage('OnDestroy');
    }
    this.gameObjects = this.gameObjects.filter(object => !object.markForDestroy);
  }

  draw(ctx) {
    for (const layer of Engine.layers) {
      for (const object of this.gameObjects) {
        if (object.layer === layer && !object.markForDestroy) object.draw(ctx);
      }
    }
  }
}
