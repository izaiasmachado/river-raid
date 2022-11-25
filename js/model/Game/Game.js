class Game {
  constructor() {
    this.over = false;
    this.setElement();

    this.setPlayer();
    this.setBackground();

    this.addScoreboard();
    this.addPointAfterLevel();

    this.setGameControlls();
    this.setCollisionDetector();

    this.setSchedulers();
  }

  start = () => {
    this.over = false;
    this.addPointAfterLevel();
    this.schedulers.start();
  };

  reset = () => {
    this.over = false;

    this.resetPlayer();
    this.resetBackground();

    this.setCollisionDetector();
    this.resetSchedulers();

    this.resetScoreboard();
    this.setGameControlls();
  };

  end = () => {
    if (this.over) return;
    this.over = true;
    this.schedulers.stop();
    this.gameOverCallback();
  };

  setGameOverCallback = (callback) => {
    this.gameOverCallback = callback;
  };

  setElement = () => {
    this.element = document.querySelector("[wm-game]");
  };

  setPlayer = () => {
    this.player = new Player();
    this.element.appendChild(this.player.element);
    this.player.setDiedCallback(this.end);
  };

  resetPlayer = () => {
    if (this.player) this.element.removeChild(this.player.element);
    this.setPlayer();
  };

  setBackground = () => {
    this.background = new Background(BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
    this.element = document.querySelector("[wm-game]");
    this.element.appendChild(this.background.element);
  };

  resetBackground = () => {
    if (this.background) this.element.removeChild(this.background.element);
    this.setBackground();
  };

  setGameControlls = () => {
    this.controlls = new GameControlls(this.player, this.background);
  };

  setSchedulers = () => {
    this.schedulers = new SchedulerManager();
    this.schedulers.add(
      this.collisionDetector.detect,
      DETECT_COLLISIONS_DELAY_MS
    );
    this.schedulers.add(updateBackground, UPDATE_BACKGROUND_DELAY_MS);
    this.schedulers.add(decreaseEnergy, DECREASE_ENERGY_DELAY_MS);
  };

  resetSchedulers = () => {
    if (this.schedulers) this.schedulers.stop();
    this.schedulers = null;
    this.setSchedulers();
  };

  addScoreboard = () => {
    this.scoreboard = new Scoreboard();

    this.player.setEnergyCallback(this.scoreboard.setEnergy);
    this.player.setPointsCallback(this.scoreboard.setPoints);

    this.player.setEnergy(this.player.energy);
    this.player.setPoints(this.player.points);

    this.element.appendChild(this.scoreboard.element);
  };

  resetScoreboard = () => {
    if (this.scoreboard) this.element.removeChild(this.scoreboard.element);
    this.addScoreboard();
  };

  addPointAfterLevel = () => {
    this.background.setPastLevelCallback(() => {
      this.player.beatLevel();
    });
  };

  setCollisionDetector = () => {
    this.collisionDetector = new CollisionDetector(
      this.player,
      this.background
    );
  };
}

function updateBackground() {
  if (!game.player.isAlive()) return;
  game.background.update();
}

function decreaseEnergy() {
  game.player.decreaseEnergy();
}
