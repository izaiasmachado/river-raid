function Game() {
  this.addPlayer = function () {
    this.player = new PlayerBackground(this.background);
    this.element.appendChild(this.player.element);
  };

  this.setBackground = function () {
    this.background = new Background(800, 600);
    this.element = document.querySelector("[wm-game]");
    this.element.appendChild(this.background.element);
  };

  this.setBackground();
  this.addPlayer();

  const levelStyles = new LevelStyles();
  this.background.addLevel(new Level(levelStyles.center));

  const interval = setInterval(() => {
    this.background.update();

    if (this.player.detectCollisions()) {
      this.player.die();
      interval && clearInterval(interval);
    }
  }, 300);
}
