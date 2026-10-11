class Globals {
  static width = 800;
  static height = 560;
  static levelIndex = 0;
  static score = 0; // Only completed levels are saved here.
  static lastLoot = 0;
  static lossReason = "";

  static reset() {
    this.levelIndex = 0;
    this.score = 0;
    this.lastLoot = 0;
    this.lossReason = "";
  }

  static go(SceneType) {
    // Ignore a second change while a scene is loading, then clear held keys.
    if (SceneManager.nextScene) return;
    Input.keysDown = [];
    Input.keysDownThisFrame = [];
    SceneManager.loadScene(SceneType);
  }
}
