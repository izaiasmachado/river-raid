class GameControlls {
  constructor(player, background) {
    this.player = player;
    this.background = background;
    this.setPlayerInitialCoordinate();

    this.periodicallyNotifyCollisions();
    this.periodicallyUpdateBackground();
  }

  movePlayer = (x, y) => {
    const newCoordinate = this.nextCoordinate({ x, y });
    this.player.setCoordinate(newCoordinate.x, newCoordinate.y);
  };

  movePlayerLeft = () => this.movePlayer(-30, 0);
  movePlayerRight = () => this.movePlayer(30, 0);

  nextCoordinate = (move) => {
    const { x: playerX, y: playerY } = this.player.coordinate;
    const { width: playerWidth, height: playerHeight } = this.player.size;
    const { width: backgroundWidth, height: backgroundHeight } =
      this.background.size;

    let nextX = playerX + move.x;
    let nextY = playerY + move.y;

    if (nextX < 0 || nextX + playerWidth > backgroundWidth) {
      nextX = playerX;
    }

    if (nextY < 0 || nextY + playerHeight > backgroundHeight) {
      nextY = playerY;
    }

    return { x: nextX, y: nextY };
  };

  detectPlayerWallCollision = () => {
    const listener = new GlobalEventListener();
    const level = this.background.levels[0];
    const tiles = level.tiles;

    tiles.forEach((tile) => {
      if (!tile.isWall) return;
      if (!tile.isColliding(this.player)) return;

      listener.notifyAll({
        type: "player-wall-collision",
        data: {
          tile,
        },
      });
    });
  };

  periodicallyNotifyCollisions = () => {
    setInterval(() => {
      if (this.player.isAlive()) {
        this.detectPlayerWallCollision();
      }
    }, 10);
  };

  periodicallyUpdateBackground = () => {
    setInterval(() => {
      if (this.player.isAlive()) {
        this.background.update();
      }
    }, 100);
  };

  setPlayerInitialCoordinate() {
    const { width: playerWidth, height: playerHeight } = this.player.size;
    const { width: backgroundWidth, height: backgroundHeight } =
      this.background.size;
    const x = (backgroundWidth - playerWidth) / 2;
    const y = backgroundHeight - playerHeight - 150;
    this.player.setCoordinate(x, y);
  }
}
