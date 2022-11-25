class CollisionDetector {
  constructor(player, background) {
    this.player = player;
    this.background = background;
  }

  getTiles = () => {
    const playerBounds = this.player.bounds();
    const levels = this.background.levels;
    const tiles = levels.map((level) => level.tiles).flat();

    const tilesUnderPlayer = tiles.filter((tile) => {
      const tileBounds = tile.bounds();
      const isUnderPlayer =
        playerBounds.left < tileBounds.right &&
        playerBounds.right > tileBounds.left &&
        playerBounds.top < tileBounds.bottom &&
        playerBounds.bottom > tileBounds.top;
      return isUnderPlayer;
    });

    return tilesUnderPlayer;
  };

  collisionDetectedCallback = (tile) => {
    if (tile.isWall) return this.wallCollision(tile);
    if (tile.hasFood) return this.foodCollision(tile);
    if (tile.hasPoint) return this.pointCollision(tile);
  };

  detectCollisions = (callback) => {
    const tilesUnderPlayer = this.getTiles();
    tilesUnderPlayer.forEach(callback);
  };

  detect = () => {
    this.detectCollisions(this.collisionDetectedCallback);
  };

  wallCollision = (tile) => {
    tile.element.classList.add("blink");
    this.player.die();
  };

  foodCollision = (tile) => {
    this.player.eat();
    tile.removeFood();
  };

  pointCollision = (tile) => {
    this.player.pickUpCoin();
    tile.removePoint();
  };
}
