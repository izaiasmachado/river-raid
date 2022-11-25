class Background {
  constructor(width, height) {
    this.size = { width, height };
    this.levels = [];
    this.setElement();
    this.setLevelTileHeight();
    this.addInitialLevels();
  }

  setPastLevelCallback = (callback) => {
    this.pastLevelCallback = callback;
  };

  setLevelTileHeight = () => {
    this.levelTileHeight = this.size.height / LEVEL_TILES_IN_SCREEN;
  };

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
    level.setMoveSpeed(BACKGROUND_SCROLL_SPEED_PX);
    level.setCoordinate(coordinate.x, previousLevelsHeight);

    this.levels.push(level);
    this.element.appendChild(level.element);
  };

  addRandomLevel = () => {
    const level = new Level(undefined, undefined, this.levelTileHeight);
    this.addLevel(level);
  };

  addCenterLevel = () => {
    const levelStyles = new LevelStyles();
    this.addLevel(
      new Level(levelStyles.center, undefined, this.levelTileHeight)
    );
  };

  addInitialLevels = () => {
    this.addCenterLevel();

    for (let i = 0; i < INITIAL_LEVELS - 1; i++) {
      this.addRandomLevel();
    }
  };

  removeLevel = (level) => {
    this.levels = this.levels.filter((l) => l !== level);
    this.element.removeChild(level.element);
  };

  removeLevelAt = (index) => {
    if (this.levels.length === 0) return;
    const level = this.levels[index];
    this.levels.shift();
    this.element.removeChild(level.element);
  };

  scroll = () => {
    this.levels.forEach((level) => {
      level.moveUp();
    });
  };

  removeBottomLevel = (callback) => {
    const bottomLevel = this.levels[0];
    bottomLevel.removeLevel((level) => {
      this.removeLevel(level);
      callback(level);
    });
  };

  update = () => {
    this.scroll();

    this.removeBottomLevel(() => {
      this.addRandomLevel();
      this.pastLevelCallback();
    });
  };
}
