class Level {
  constructor(
    prototype = chooseLevel(),
    coordinate = { x: 0, y: 0 },
    tileHeight
  ) {
    this.levelPrototype = prototype;
    this.rows = this.levelPrototype.length;
    this.columns = this.levelPrototype[0].length;
    this.tiles = [];
    this.tileHeight = tileHeight;

    this.createElement();
    this.setCoordinate(coordinate.x, coordinate.y);
    this.createLevelGrid();
    this.createWalls();
    this.giveChanceAddPerks();
  }

  setMoveSpeed = (speed) => {
    this.moveSpeed = speed;
  };

  getRowsAndColumns = () => {
    const rows = this.rows;
    const columns = this.columns;

    return { rows, columns };
  };

  setRowsAndColumns = (dimensions) => {
    this.rows = dimensions.rows;
    this.columns = dimensions.columns;
  };

  createElement = () => {
    const element = document.createElement("div");
    element.classList.add("level");
    this.element = element;
  };

  createLevelGrid = () => {
    this.element.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    this.element.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;

    this.element.style.width = "100%";
    this.element.style.height = this.rows * this.tileHeight + "px";
    this.size = {
      width: parseInt(this.element.style.width),
      height: parseInt(this.element.style.height),
    };
  };

  createWalls = () => {
    const { rows, columns } = this.getRowsAndColumns();

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const isWall = this.levelPrototype[row][column] === 1;
        const tile = isWall ? new Wall(row, column) : new Floor(row, column);
        const cell = tile.element;
        this.tiles.push(tile);
        this.element.appendChild(cell);
      }
    }
  };

  isAdjacentToWall = (tile) => {
    const adjacentTiles = this.getAdjacentTiles(tile);
    const adjacentToWall = adjacentTiles.some((tile) => tile.isWall);
    return adjacentToWall;
  };

  getAdjacentTiles = (tile) => {
    const { rows, columns } = this.getRowsAndColumns();
    const { x, y } = tile.getCoordinate();
    const adjacentTiles = [];

    const nextX = [0, 0, 1, -1, 1, 1, -1, -1];
    const nextY = [1, -1, 0, 0, 1, -1, 1, -1];

    for (let i = 0; i < 4; i++) {
      const newX = x + nextX[i];
      const newY = y + nextY[i];

      if (newX < 0 || newX >= rows || newY < 0 || newY >= columns) continue;

      const adjacentTile = this.tiles[newX * columns + newY];
      adjacentTiles.push(adjacentTile);
    }

    return adjacentTiles;
  };

  moveY = (y) => {
    this.coordinate.y += y;
    this.element.style.bottom = String(this.coordinate.y) + "px";
  };

  moveUp = () => {
    this.moveY(-this.moveSpeed);
  };

  setCoordinate = (x, y) => {
    this.coordinate = { x, y };
    this.element.style.left = this.coordinate.x + "px";
    this.element.style.bottom = this.coordinate.y + "px";
  };

  removeLevel = (callback) => {
    if (-this.coordinate.y + this.moveSpeed <= this.size.height) return;
    callback(this);
  };

  giveChanceAddPerks = () => {
    this.tiles.forEach((tile) => {
      if (!tile.isFloor) return;
      if (tile.hasSomething()) return;
      if (this.isAdjacentToWall(tile)) return;
      tile.giveChanceAddPoint();
      tile.giveChanceAddFood();
    });
  };
}

function chooseLevel() {
  const levelStyles = new LevelStyles();
  const levels = Object.keys(levelStyles);
  const randomIndex = Math.floor(Math.random() * levels.length);
  const level = levels[randomIndex];
  const levelPrototype = levelStyles[level];
  return levelPrototype;
}
