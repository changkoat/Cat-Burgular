// onto each edge normal. A separating axis means they do not overlap.
class GameCollisions {
  static worldPoints(object) {
    // Cat Burglar uses rectangular hitboxes, including temporary trap-placement areas.
    const points = [new Vector2(0, 0), new Vector2(object.w, 0),
      new Vector2(object.w, object.h), new Vector2(0, object.h)];
    const matrix = object.transform.getWorldMatrix?.();
    return points.map(point => {
      if (matrix) {
        const world = matrix.transformPoint(point);
        return new Vector2(world.x, world.y);
      }
      return new Vector2(point.x + object.transform.position.x,
        point.y + object.transform.position.y);
    });
  }

  static isCollisionPolygonPolygon(first, second) {
    const firstPoints = this.worldPoints(first);
    const secondPoints = this.worldPoints(second);
    for (const polygon of [firstPoints, secondPoints]) {
      for (let i = 0; i < polygon.length; i++) {
        const edge = polygon[(i + 1) % polygon.length].minus(polygon[i]);
        const axis = edge.orthogonal();
        const firstProjection = firstPoints.map(point => point.dot(axis));
        const secondProjection = secondPoints.map(point => point.dot(axis));
        if (Math.max(...firstProjection) <= Math.min(...secondProjection) ||
            Math.max(...secondProjection) <= Math.min(...firstProjection)) return false;
      }
    }
    return true;
  }
}
