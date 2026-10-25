class Engine {
  static canvas;
  static ctx;
  static layers = ['default', 'UI'];
  static running = false;

  static start(FirstScene, settings = {}) {
    if (this.running) return;
    this.canvas = document.querySelector('#canv');
    this.ctx = this.canvas?.getContext('2d');
    if (!this.ctx) throw new Error('The game needs a canvas with a 2D drawing context.');
    window.addEventListener('keydown', Input.keyDown);
    window.addEventListener('keyup', Input.keyUp);
    this.layers = settings.layers ?? ['default', 'UI'];
    if (FirstScene) SceneManager.loadScene(FirstScene);
    SceneManager.update();
    this.running = true;
    Time.lastTimestamp = undefined;
    this.gameLoop(performance.now());
  }

  static update() {
    const scene = SceneManager.getActiveScene();
    scene?.start();
    scene?.update();
  }

  static draw() {
    Engine.canvas.width = window.innerWidth;
    Engine.canvas.height = window.innerHeight;
    SceneManager.getActiveScene()?.draw(Engine.ctx);
  }

  static gameLoop(timestamp) {
    Time.tick(timestamp);
    Engine.update();
    Input.update();
    SceneManager.update();
    Engine.draw();
    requestAnimationFrame(Engine.gameLoop);
  }
}
