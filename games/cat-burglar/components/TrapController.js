class TrapController extends Component {
  state = 'idle';
  timer = 0;

  update() {
    const scene = this.gameObject.scene;
    if (scene.state !== 'playing') return;
    const trap = this.gameObject;
    const cat = scene.cat;
    const p = this.transform.position, c = cat.transform.position;
    const nearby = Math.hypot(p.x + 24 - c.x - 14, p.y + 24 - c.y - 14) < 78;
    const touching = scene.overlaps(trap, cat);
    // Pots react to a nearby cat; floor traps react when the cat steps on them.
    if (this.state === 'idle') {
      if (trap.kind === 'pot' ? nearby : touching) {
        this.state = 'warning';
        this.timer = trap.kind === 'mat' ? 0.9 : 0.75;
      }
      return;
    }
    this.timer -= Time.deltaTime;
    // The warning gives the player a chance to leave before the trap can hurt them.
    if (this.state === 'warning' && this.timer <= 0) {
      this.state = 'active';
      this.timer = 0.55;
    }
    if (this.state === 'active') {
      if (touching) {
        const jokes = { snap: 'The floor bit back.', pot: 'A flowerpot had other plans.', mat: 'The SAFE mat was lying.' };
        Globals.lossReason = jokes[trap.kind];
        scene.finish(false);
        return;
      }
      if (this.timer <= 0) { this.state = 'cooldown'; this.timer = 2.5; }
    }
    // Stay harmless until the cat leaves, so a trap cannot repeatedly hit a camper.
    if (this.state === 'cooldown' && this.timer <= 0 && !nearby) this.state = 'idle';
  }

  draw(ctx) {
    const kind = this.gameObject.kind;
    const warning = this.state === 'warning';
    const active = this.state === 'active';
    ctx.fillStyle = active ? '#d94840' : warning ? (Math.floor(this.timer * 12) % 2 ? '#ffc857' : '#dc8538') : '#526452';
    ctx.fillRect(0, 0, 48, 48);
    ctx.strokeStyle = '#263f36'; ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 44, 44);
    ctx.textAlign = 'center'; ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#fff2ce';
    if (warning) {
      ctx.fillText('!', 24, 20);
      ctx.fillText('MOVE!', 24, 36);
    } else if (kind === 'mat') {
      ctx.fillText(active ? 'LIAR!' : this.state === 'cooldown' ? 'NICE TRY' : 'SAFE', 24, 28);
    } else if (kind === 'pot') {
      // The pot descends into its marked landing square when it strikes.
      ctx.fillStyle = '#bb7650';
      ctx.fillRect(13, active ? 17 : 7, 22, 20);
      ctx.fillStyle = '#91ba70'; ctx.fillRect(20, active ? 8 : 0, 8, 12);
      if (active) { ctx.fillStyle = '#fff2ce'; ctx.fillText('BONK', 24, 44); }
    } else {
      ctx.fillStyle = '#e3d7bb';
      for (let x = 5; x < 44; x += 10) {
        ctx.beginPath(); ctx.moveTo(x, active ? 38 : 42);
        ctx.lineTo(x + 4, active ? 12 : 36); ctx.lineTo(x + 8, active ? 38 : 42); ctx.fill();
      }
    }
  }
}
