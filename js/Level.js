// LEMBRETE: ADICIONAR ARVORES PIXEL ART NAS PAREDES
function Level(prototype, coordinate = { x: 0, y: 0 }) {
  if (!prototype) {
    prototype = chooseLevel();
  }

  const rows = prototype.length;
  const columns = prototype[0].length;
  const rowSize = 60;

  this.coordinate = coordinate;
  this.element = document.createElement("div");
  this.element.classList.add("level");

  this.element.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  this.element.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  this.element.style.width = "100%";
  this.element.style.height = rows * rowSize + "px";

  this.size = {
    width: parseInt(this.element.style.width),
    height: parseInt(this.element.style.height),
  };

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const className = prototype[row][column] === 1 ? "wall" : "floor";
      const cell = document.createElement("div");
      cell.classList.add("cell", className);
      this.element.appendChild(cell);
    }
  }

  this.moveY = function (y) {
    this.coordinate.y += y;
    this.element.style.bottom = String(this.coordinate.y) + "px";
  };

  this.moveUp = function () {
    this.moveY(-rowSize);
  };

  this.setCoordinate = function (x, y) {
    this.coordinate = { x, y };
    this.element.style.left = this.coordinate.x + "px";
    this.element.style.bottom = this.coordinate.y + "px";
  };

  this.canBeRemoved = function () {
    return -this.coordinate.y + rowSize > this.size.height;
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
