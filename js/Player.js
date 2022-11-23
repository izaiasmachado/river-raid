class Player {
  constructor(x = 0, y = 0) {
    this.alive = true;

    this.createElement();
    this.setCoordinate(x, y);
    this.setSize({ width: 60, height: 60 });
  }

  createElement = () => {
    const element = document.createElement("div");
    element.classList.add("player");

    const img = document.createElement("img");
    img.src = "img/goku.gif";
    element.appendChild(img);

    this.element = element;
  };

  setCoordinate = (x, y) => {
    this.coordinate = { x, y };
    this.element.style.left = this.coordinate.x + "px";
    this.element.style.top = this.coordinate.y + "px";
  };

  setSize = (size) => {
    this.size = size;
    this.element.style.width = this.size.width + "px";
    this.element.style.height = this.size.height + "px";
  };

  moveLeft = () => this.move(-30, 0);
  moveRight = () => this.move(30, 0);

  bounds = () => {
    const rectangle = this.element.getBoundingClientRect();
    return rectangle;
  };

  isAlive = () => this.alive;

  die = () => {
    this.alive = false;
    this.element.classList.add("blink");
  };
}
