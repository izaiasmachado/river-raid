class Level {
  constructor(prototype = chooseLevel(), coordinate = { x: 0, y: 0 }) {
    this.levelPrototype = prototype;
    this.rows = this.levelPrototype.length;
    this.columns = this.levelPrototype[0].length;

    this.rowSize = 60;

    this.createElement();
    this.setCoordinate(coordinate.x, coordinate.y);
    this.createLevelGrid();
    this.createWalls();
  }

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
    this.element.style.height = this.rows * this.rowSize + "px";
    this.size = {
      width: parseInt(this.element.style.width),
      height: parseInt(this.element.style.height),
    };
  };

  createWalls = () => {
    const { rows, columns } = this.getRowsAndColumns();

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const className =
          this.levelPrototype[row][column] === 1 ? "wall" : "floor";
        const cell = document.createElement("div");

        cell.classList.add("cell", className);

        if (className === "wall" && Math.random() * 100 < 5) {
          const tree = document.createElement("div");
          tree.classList.add("tree");

          const treeImg = document.createElement("img");
          treeImg.src = "img/dead-tree.png";
          tree.appendChild(treeImg);

          cell.appendChild(tree);
        }

        this.element.appendChild(cell);
      }
    }
  };

  moveY = (y) => {
    this.coordinate.y += y;
    this.element.style.bottom = String(this.coordinate.y) + "px";
  };

  moveUp = () => {
    this.moveY(-this.rowSize);
  };

  setCoordinate = (x, y) => {
    this.coordinate = { x, y };
    this.element.style.left = this.coordinate.x + "px";
    this.element.style.bottom = this.coordinate.y + "px";
  };

  canBeRemoved = () => {
    return -this.coordinate.y + this.rowSize > this.size.height;
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
