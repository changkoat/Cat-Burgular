class SceneManager {
  static currentScene;
  static nextScene;

  static getActiveScene() { return this.currentScene; }
  static loadScene(SceneType, additive = false) {
    if (additive && this.currentScene) {
      const extra = new SceneType();
      for (const object of extra.gameObjects) {
        object.scene = this.currentScene;
        this.currentScene.gameObjects.push(object);
      }
    } else if (!this.nextScene) {
      this.nextScene = SceneType;
    }
  }

  static update() {
    if (!this.nextScene) return;
    const SceneType = this.nextScene;
    this.nextScene = undefined;
    for (const object of this.currentScene?.gameObjects ?? []) object.sendMessage('OnDestroy');
    this.currentScene = new SceneType();
  }
}
