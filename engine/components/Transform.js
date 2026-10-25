class Transform extends Component {
  position = new Vector2();
  scale = new Vector2(1, 1);
  rotation = 0;
  parent;

  setParent(transform) { this.parent = transform; }

  getLocalMatrix() {
    const matrix = new DOMMatrix();
    matrix.translateSelf(this.position.x, this.position.y);
    matrix.scaleSelf(this.scale.x, this.scale.y);
    matrix.rotateSelf(this.rotation * 180 / Math.PI);
    return matrix;
  }

  getWorldMatrix() {
    const local = this.getLocalMatrix();
    return this.parent ? this.parent.getWorldMatrix().multiply(local) : local;
  }
}
