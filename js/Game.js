class Game {
  constructor() {
    this.over = false;
    this.setBackground();
    this.addPlayer();
    this.handleKeydowns();
    this.listenCollisions();

    const levelStyles = new LevelStyles();
    this.background.addLevel(new Level(levelStyles.center));
  }

  addPlayer = function () {
    this.player = new PlayerBackground(this.background);
    this.element.appendChild(this.player.element);
  };

  setBackground = function () {
    this.background = new Background(800, 600);
    this.element = document.querySelector("[wm-game]");
    this.element.appendChild(this.background.element);
  };

  handleKeydown = function (command) {
    const keyActions = {
      a: () => this.player.moveLeft(),
      d: () => this.player.moveRight(),
      ArrowLeft: () => this.player.moveLeft(),
      ArrowRight: () => this.player.moveRight(),
    };
    const action = keyActions[command.keyPressed];

    if (action === undefined) {
      throw new Error("Key not mapped");
    }

    action();
  };

  handleKeydowns = function () {
    const listener = new GlobalEventListener();

    listener.subscribe({
      notify: (command) => {
        if (command.type !== "keydown") return;

        try {
          this.handleKeydown(command);
        } catch {}
      },
    });
  };

  listenCollisions = function () {
    const listener = new GlobalEventListener();

    listener.subscribe({
      notify: (command) => {
        if (command.type !== "player-wall-collision") return;

        const cell = command.data.cell;
        cell.classList.add("blink");

        this.player.die();
      },
    });
  };
}
