function Game() {
  this.addPlayer = function () {
    this.player = new Player();
    const x = this.background.size.width / 2 - this.player.size.width / 2;
    const y = this.background.size.height - this.player.size.height - 150;

    this.player.setCoordinate(x, y);
    this.element.appendChild(this.player.element);

    const background = this.background;

    this.player.move = function (x, y) {
      const player = this;
      this.coordinate = nextCoordinate(player, background, { x, y });
      this.setCoordinate(this.coordinate.x, this.coordinate.y);
    };
  };

  this.setBackground = function () {
    this.background = new Background(800, 600);
    this.element = document.querySelector("[wm-game]");
    this.element.appendChild(this.background.element);
  };

  this.setBackground();
  this.addPlayer();

  const levelStyles = new LevelStyles();
  this.background.addLevel(new Level(levelStyles.center));

  setInterval(() => {
    this.background.update();
  }, 200);
}

function nextCoordinate(player, background, move) {
  const { x: playerX, y: playerY } = player.coordinate;
  let nextX = playerX + move.x;
  let nextY = playerY + move.y;

  if (nextX < 0 || nextX + player.size.width > background.size.width) {
    nextX = playerX;
  }

  if (nextY < 0 || nextY + player.size.height > background.size.height) {
    nextY = playerY;
  }

  return { x: nextX, y: nextY };
}
