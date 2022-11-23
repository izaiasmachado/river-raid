function Game() {
  this.addPlayer = function () {
    this.player = new PlayerBackground(this.background);
    this.element.appendChild(this.player.element);
  };

  this.setBackground = function () {
    this.background = new Background(800, 600);
    this.element = document.querySelector("[wm-game]");
    this.element.appendChild(this.background.element);
  };

  this.detectCollisions = function () {
    const level = this.background.levels[0];
    const player = this.player;

    const collidedCells = detectPlayerWallCollision(player, level);

    collidedCells.forEach((collisionCell) => {
      collisionCell.classList.add("blink");
    });

    return collidedCells.length > 0;
  };

  this.setBackground();
  this.addPlayer();

  const levelStyles = new LevelStyles();
  this.background.addLevel(new Level(levelStyles.center));

  const interval = setInterval(() => {
    this.background.update();

    if (this.detectCollisions()) {
      this.player.die();
      interval && clearInterval(interval);
    }
  }, 300);
}

function detectPlayerWallCollision(player, level) {
  const playerRectangle = player.bounds();
  const {
    left: playerLeft,
    right: playerRight,
    top: playerTop,
    bottom: playerBottom,
  } = playerRectangle;

  const cells = level.element.getElementsByClassName("wall");

  const collidedCell = [];

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
      collidedCell.push(cell);
    }
  }

  return collidedCell;
}
