class LootBagController extends Component {
  draw(ctx) {
    ctx.fillStyle = '#9c653c';
    ctx.fillRect(0, 5, 14, 13);
    ctx.strokeStyle = '#5f3a27';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 5, 14, 13);
    ctx.beginPath();
    ctx.arc(7, 5, 4, Math.PI, 0);
    ctx.stroke();
  }
}
