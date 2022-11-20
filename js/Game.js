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

  this.detectCollisions = function () {
    const playerElement = this.player.element;
    const playerRect = playerElement.getBoundingClientRect();

    const playerLeft = playerRect.left;
    const playerRight = playerRect.right;
    const playerTop = playerRect.top;
    const playerBottom = playerRect.bottom;

    const cells =
      this.background.levels[0].element.getElementsByClassName("wall");

    const collided = [];

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const rect = cell.getBoundingClientRect();

      const cellLeft = rect.left;
      const cellRight = rect.right;
      const cellTop = rect.top;
      const cellBottom = rect.bottom;

      isColliding =
        playerLeft < cellRight &&
        playerRight > cellLeft &&
        playerTop < cellBottom &&
        playerBottom > cellTop;

      if (isColliding) {
        collided.push(cell);
        cell.classList.add("blink");
      }
    }

    return collided.length > 0;
  };

  this.setBackground();
  this.addPlayer();

  const levelStyles = new LevelStyles();
  this.background.addLevel(new Level(levelStyles.center));

  const interval = setInterval(() => {
    this.background.update();
    if (this.detectCollisions()) {
      interval && clearInterval(interval);
      console.log("collision");
    }
  }, 300);
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
