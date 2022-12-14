class Player {
  constructor(x = 0, y = 0) {
    this.alive = true;
    this.energy = PLAYER_DEFAULT_ENERGY;
    this.points = 0;
    this.timesAteFood = 0;
    this.timesPickedCoin = 0;
    this.levelsBeat = 0;
    this.coinsPicked = 0;

    this.createElement();
    this.setCoordinate(x, y);
    this.setSize({ width: 60, height: 60 });
  }

  setDiedCallback = (callback) => {
    this.diedCallback = callback;
  };

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
    this.diedCallback();
  };

  setEnergyCallback = (callback) => {
    if (typeof callback !== "function") return;
    this.energyCallback = callback;
  };

  setEnergy = (energy) => {
    if (!this.isAlive()) return;

    if (energy < 0) this.energy = 0;
    if (energy > PLAYER_MAX_ENERGY) this.energy = PLAYER_MAX_ENERGY;
    else this.energy = energy;

    if (this.energy <= 0) this.die();

    if (!this.energyCallback) return;
    this.energyCallback(this.energy);
  };

  decreaseEnergy = () => {
    this.setEnergy(this.energy - 1);
    if (this.energy <= 0) this.die();
  };

  eat = () => {
    this.timesAteFood++;
    this.setEnergy(this.energy + PLAYER_ENERGY_GAIN);
  };

  setPointsCallback = (callback) => {
    if (typeof callback !== "function") return;
    this.pointsCallback = callback;
  };

  setPoints = (points) => {
    if (!this.isAlive()) return;
    this.points = points;
    if (!this.pointsCallback) return;
    this.pointsCallback(this.points);
  };

  pickUpCoin = () => {
    this.coinsPicked++;
    this.setPoints(this.points + 1);
  };

  beatLevel = () => {
    this.levelsBeat++;
    this.setPoints(this.points + 1);
  };

  decreasePoints = () => {
    if (!this.isAlive()) return;
    if (this.points <= 0) return;
    this.setPoints(this.points - 1);
  };

  getPoints = () => this.points;
  getEnergy = () => this.energy;
}
