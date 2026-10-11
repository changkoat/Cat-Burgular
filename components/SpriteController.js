class SpriteController extends Component {
  constructor(kind) { super(); this.kind = kind; }

  draw(ctx) { Assets.draw(this.kind, ctx); }
}
