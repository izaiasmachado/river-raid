class Game {
  constructor() {
    this.setElement();

    this.setPlayer();
    this.setBackground();

    this.setGameControlls();
    this.addScoreboard();

    this.addPointAfterLevel();
  }

  setElement = () => {
    this.element = document.querySelector("[wm-game]");
  };

  setPlayer = () => {
    this.player = new Player();
    this.element.appendChild(this.player.element);
  };

  setBackground = () => {
    this.background = new Background(BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
    this.element = document.querySelector("[wm-game]");
    this.element.appendChild(this.background.element);
  };

  setGameControlls = () => {
    this.controlls = new GameControlls(this.player, this.background);
  };

  addScoreboard = () => {
    this.scoreboard = new Scoreboard();

    this.player.setEnergyCallback(this.scoreboard.setEnergy);
    this.player.setPointsCallback(this.scoreboard.setPoints);

    this.player.setEnergy(this.player.energy);
    this.player.setPoints(this.player.points);

    this.element.appendChild(this.scoreboard.element);
  };

  addPointAfterLevel = () => {
    this.background.setPastLevelCallback(() => {
      this.player.increasePoints();
    });
  };
}
