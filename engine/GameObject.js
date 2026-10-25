class GameObject {
  components = [];
  layer = 'default';
  scene;
  markForDestroy = false;
  hasStarted = false;

  constructor(name, options = {}, layer = 'default') {
    this.name = name;
    this.tags = Array.isArray(options) ? options : [];
    this.layer = layer;
    if (!Array.isArray(options)) Object.assign(this, options);
    this.addComponent(new Transform());
  }

  addComponent(component, options = {}) {
    Object.assign(component, options);
    component.gameObject = this;
    this.components.push(component);
    return component;
  }

  getComponent(Type) { return this.components.find(component => component instanceof Type); }
  get transform() { return this.getComponent(Transform); }
  destroy() { this.markForDestroy = true; }

  start() {
    this.hasStarted = true;
    for (const component of this.components) {
      if (component.didStart) continue;
      component.didStart = true;
      component.start?.();
    }
  }

  broadcastMessage(method, args = []) {
    for (const component of this.components) component[method]?.(...args);
  }

  sendMessage(method, args = []) {
    this.start();
    this.broadcastMessage(method, args);
  }

  update() { this.sendMessage('update'); }

  draw(ctx) {
    ctx.save();
    ctx.setTransform(ctx.getTransform().multiply(this.transform.getWorldMatrix()));
    this.sendMessage('draw', [ctx]);
    ctx.restore();
  }
}
