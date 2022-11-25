class Tile {
  constructor(x, y) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    this.element = cell;

    this.x = x;
    this.y = y;
  }

  getCoordinate = () => {
    return {
      x: this.x,
      y: this.y,
    };
  };

  bounds = () => {
    const rectangle = this.element.getBoundingClientRect();
    return rectangle;
  };

  isColliding = (player) => {
    const elementBounds = player.bounds();
    const tileBounds = this.bounds();

    const isColliding =
      elementBounds.left < tileBounds.right &&
      elementBounds.right > tileBounds.left &&
      elementBounds.top < tileBounds.bottom &&
      elementBounds.bottom > tileBounds.top;

    return isColliding;
  };
}
