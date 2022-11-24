class Background {
  constructor(width, height) {
    this.size = { width, height };
    this.levels = [];
    this.setElement();
    this.addInitialLevels();
  }

  setElement = () => {
    this.element = document.createElement("div");
    this.element.classList.add("background");
    this.element.style.width = `${this.size.width}px`;
    this.element.style.height = `${this.size.height}px`;
  };

  addLevel = (level) => {
    const previousLevelsHeight = this.levels.reduce(
      (sum, level) => sum + level.size.height,
      0
    );
    const { coordinate } = level;
    level.setCoordinate(coordinate.x, previousLevelsHeight);
    level.setMoveSpeed(BACKGROUND_SCROLL_SPEED_PX);

    this.levels.push(level);
    this.element.appendChild(level.element);
  };

  addRandomLevel = () => {
    const level = new Level();
    this.addLevel(level);
  };

  addCenterLevel = () => {
    const levelStyles = new LevelStyles();
    this.addLevel(new Level(levelStyles.center));
  };

  addInitialLevels = () => {
    this.addCenterLevel();

    for (let i = 0; i < INITIAL_LEVELS - 1; i++) {
      this.addRandomLevel();
    }
  };

  removeLevelAt = (index) => {
    if (this.levels.length === 0) return;
    const level = this.levels[index];
    this.levels.shift();
    this.element.removeChild(level.element);
  };

  tryRemovingBottomLevel = (callback) => {
    const level = this.levels[0];
    if (!level.canBeRemoved()) return;
    this.removeLevelAt(0);
    callback();
  };

  scroll = () => {
    this.levels.forEach((level) => {
      level.moveUp();
    });
  };

  update = () => {
    this.scroll();
    this.tryRemovingBottomLevel(() => {
      this.addRandomLevel();
    });
    console.log(this.levels.length);
  };
}
