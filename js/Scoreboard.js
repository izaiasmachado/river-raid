class Scoreboard {
  constructor() {
    this.createElement();
    this.setUpEnergyBoard();
    this.setUpPointsBoard();
    this.setPoints(0);
    this.setEnergy(0);
  }

  createElement = () => {
    this.element = document.createElement("div");
    this.element.classList.add("scoreboard");

    const emptyDivLeft = document.createElement("div");
    emptyDivLeft.classList.add("empty-left");
    this.element.appendChild(emptyDivLeft);
  };

  setUpEnergyBoard = () => {
    this.energy = {};
    this.energy.element = document.createElement("div");
    this.energy.element.classList.add("energy");

    this.energy.progress = document.createElement("progress");
    this.energy.progress.classList.add("energy-progress");
    this.energy.progress.setAttribute("max", "60");
    this.energy.progress.setAttribute("value", "5");
    this.energy.element.appendChild(this.energy.progress);

    this.element.appendChild(this.energy.element);
    this.setEnergy(0);
  };

  setUpPointsBoard = () => {
    this.points = {};
    this.points.element = document.createElement("div");
    this.points.element.classList.add("points");
    this.element.appendChild(this.points.element);
    this.setPoints(0);
  };

  setEnergy = (energy) => {
    this.energy.value = energy;
    this.energy.progress.setAttribute("value", this.energy.value);
  };

  setPoints = (points) => {
    this.points.value = points;
    this.points.element.innerText = this.points.value;
  };
}
