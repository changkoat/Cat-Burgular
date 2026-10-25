class TextLabel extends Component {
  text = '';
  font = '20px sans-serif';
  fillStyle = '#ffffff';

  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.fillStyle;
    ctx.fillText(this.text, 0, 0);
  }
}
