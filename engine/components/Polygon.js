class Polygon extends Component {
  points = [];
  fillStyle = '#ffffff';
  strokeStyle = '#000000';
  lineWidth = 1;

  draw(ctx) {
    if (!this.points.length) return;
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (const point of this.points.slice(1)) ctx.lineTo(point.x, point.y);
    ctx.closePath();
    ctx.fillStyle = this.fillStyle;
    ctx.fill();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
  }
}
