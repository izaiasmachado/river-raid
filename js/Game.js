class Game {
  constructor() {
    this.setElement();

    this.setPlayer();
    this.setBackground();

    this.addInitialBackgroundLevel();
    this.setGameControlls();
  }

  setElement = () => {
    this.element = document.querySelector("[wm-game]");
  };

  setPlayer = () => {
    this.player = new Player();
    this.element.appendChild(this.player.element);
  };

  setBackground = () => {
    this.background = new Background(800, 600);
    this.element = document.querySelector("[wm-game]");
    this.element.appendChild(this.background.element);
  };

  addInitialBackgroundLevel = () => {
    const levelStyles = new LevelStyles();
    this.background.addLevel(new Level(levelStyles.center));
  };

  setGameControlls = () => {
    this.controlls = new GameControlls(this.player, this.background);
  };
}
