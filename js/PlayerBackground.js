class PlayerBackground extends Player {
  constructor(background) {
    super();

    this.background = background;
    const x = this.background.size.width / 2 - this.size.width / 2;
    const y = this.background.size.height - this.size.height - 150;

    this.setCoordinate(x, y);
  }

  move = (x, y) => {
    const move = { x, y };
    if (!this.isAlive()) return;

    this.coordinate = this.nextCoordinate(move);
    this.setCoordinate(this.coordinate.x, this.coordinate.y);
  };

  nextCoordinate = (move) => {
    const { x: playerX, y: playerY } = this.coordinate;
    const { width: playerWidth, height: playerHeight } = this.size;
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

  detectCollisions = () => {
    const level = this.background.levels[0];
    const collidedCells = detectPlayerWallCollision(this, level);

    collidedCells.forEach((collisionCell) => {
      collisionCell.classList.add("blink");
    });

    return collidedCells.length > 0;
  };
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
