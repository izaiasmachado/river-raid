class CollisionDetector {
  constructor(player, background) {
    this.player = player;
    this.background = background;
  }

  collisionDetectedCallback = (tile) => {
    if (tile.isWall) return this.wallCollision(tile);
    if (tile.hasFood) return this.foodCollision(tile);
    if (tile.hasPoint) return this.pointCollision(tile);
  };

  detectCollisions = (callback) => {
    const level = this.background.levels[0];
    const tiles = level.tiles;

    tiles.forEach((tile) => {
      if (!tile.isColliding(this.player)) return;

      callback(tile);
    });
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
