class Scoreboard {
  constructor() {
    this.createElement();
    this.setScoreboard(0, 0);
  }

  createElement = () => {
    this.element = document.createElement("div");
    this.element.classList.add("scoreboard");

    this.energy = {
      element: document.createElement("div"),
      value: 0,
    };

    this.energy.element.classList.add("energy");
    this.element.appendChild(this.energy.element);

    this.points = {
      element: document.createElement("div"),
      value: 0,
    };

    this.points.element.classList.add("points");
    this.element.appendChild(this.points.element);
  };

  updateScoreboard = () => {
    this.energy.element.innerHTML = "Energy: " + this.energy.value;
    this.points.element.innerHTML = "Points: " + this.points.value;
  };

  setScoreboard = (energy, points) => {
    this.energy.value = energy;
    this.points.value = points;

    this.updateScoreboard();
  };
}
