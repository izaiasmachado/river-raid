class Player {
  constructor(x = 0, y = 0) {
    this.alive = true;
    this.energy = 40;
    this.points = 0;

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
    if (!this.isAlive()) return;
    this.coordinate = { x, y };
    this.element.style.left = this.coordinate.x + "px";
    this.element.style.top = this.coordinate.y + "px";
  };

  setSize = (size) => {
    this.size = size;
    this.element.style.width = this.size.width + "px";
    this.element.style.height = this.size.height + "px";
  };

  bounds = () => {
    const rectangle = this.element.getBoundingClientRect();
    return rectangle;
  };

  isAlive = () => this.alive;

  die = () => {
    this.alive = false;
    this.element.classList.add("blink");
  };

  decreaseEnergy = () => {
    if (!this.isAlive()) return;

    this.energy -= 1;
    if (this.energy <= 0) this.die();
  };

  increaseEnergy = () => {
    if (!this.isAlive()) return;
    this.energy += 1;
  };

  increasePoints = () => {
    if (!this.isAlive()) return;
    this.points += 1;
  };

  decreasePoints = () => {
    if (!this.isAlive()) return;
    if (this.points <= 0) return;
    this.points -= 1;
  };

  getPoints = () => this.points;
  getEnergy = () => this.energy;
}
