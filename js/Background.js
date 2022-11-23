function Background(width, height) {
  this.element = document.createElement("div");
  this.element.classList.add("background");

  this.element.style.width = width + "px";
  this.element.style.height = height + "px";

  this.levels = [];
  this.size = {
    width,
    height,
  };

  this.addLevel = function (level) {
    const previousLevelsHeight = this.levels.reduce(
      (sum, level) => sum + level.size.height,
      0
    );
    const { coordinate } = level;
    level.setCoordinate(coordinate.x, previousLevelsHeight);

    this.levels.push(level);
    this.element.appendChild(level.element);
  };

  this.removeFirstLevel = function () {
    if (this.levels.length === 0) return;

    const level = this.levels[0];
    if (!level.canBeRemoved()) return;

    this.levels.shift();
    this.element.removeChild(level.element);
  };

  this.scroll = function () {
    this.levels.forEach((level) => {
      level.moveUp();
    });
  };

  this.update = function () {
    while (this.levels.length < 3) {
      const level = new Level();
      this.addLevel(level);
    }

    this.scroll();
    this.removeFirstLevel();
  };
}
