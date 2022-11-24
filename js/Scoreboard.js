class Scoreboard {
  constructor() {
    this.createElement();
    this.setScoreboard(0, 0);
  }

  createElement = () => {
    this.element = document.createElement("div");
    this.element.classList.add("scoreboard");

    const emptyDivLeft = document.createElement("div");
    emptyDivLeft.classList.add("empty-left");
    this.element.appendChild(emptyDivLeft);

    this.energy = {
      element: document.createElement("div"),
      value: 0,
    };

    this.energy.element.classList.add("energy");

    this.energy.progress = document.createElement("progress");
    this.energy.progress.classList.add("energy-progress");
    this.energy.progress.setAttribute("max", "60");
    this.energy.progress.setAttribute("value", "5");
    this.energy.element.appendChild(this.energy.progress);

    this.element.appendChild(this.energy.element);

    this.points = {
      element: document.createElement("div"),
      value: 0,
    };

    this.points.element.classList.add("points");
    this.element.appendChild(this.points.element);
  };

  updateScoreboard = () => {
    this.energy.progress.setAttribute("value", this.energy.value);
    this.points.element.innerHTML = this.points.value;
  };

  setScoreboard = (energy, points) => {
    this.energy.value = energy;
    this.points.value = points;

    this.updateScoreboard();
  };
}
