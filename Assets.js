class Assets {
  // These canvas shapes are the game's artwork; there are no image files to load.
  static draw(kind, ctx) {
    if (kind === 'cat') {
      ctx.fillStyle = '#cbd1cc';
      ctx.fillRect(0, 7, 28, 21);
      ctx.beginPath();
      ctx.moveTo(0, 9); ctx.lineTo(0, 0); ctx.lineTo(10, 9);
      ctx.moveTo(18, 9); ctx.lineTo(28, 0); ctx.lineTo(28, 9);
      ctx.fill();
      ctx.fillStyle = '#26332e';
      ctx.fillRect(2, 11, 24, 8);
      ctx.fillStyle = '#f2d77b';
      ctx.fillRect(6, 13, 3, 3); ctx.fillRect(19, 13, 3, 3);
      ctx.fillStyle = '#eeae9e'; ctx.fillRect(12, 22, 4, 3);
    }
    if (kind === 'guard') {
      ctx.fillStyle = '#e17e6c'; ctx.fillRect(0, 4, 28, 24);
      ctx.fillStyle = '#623d38'; ctx.fillRect(-2, 0, 32, 7);
      ctx.fillStyle = '#262f2a'; ctx.fillRect(5, 11, 4, 4); ctx.fillRect(19, 11, 4, 4);
      ctx.fillStyle = '#f4d57e'; ctx.fillRect(11, 21, 6, 5);
    }
    if (kind === 'loot') {
      ctx.fillStyle = '#f4ce67';
      ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(20, 10);
      ctx.lineTo(10, 20); ctx.lineTo(0, 10); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#fff0b3'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(10, 4); ctx.lineTo(4, 10); ctx.stroke();
    }
  }
}
