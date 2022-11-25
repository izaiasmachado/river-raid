class Screen {
  setCallback = (callback) => {
    this.callback = callback;
  };

  addEventListeners = () => {
    document.addEventListener("keydown", this.keydownListener);
  };

  removeEventListeners = () => {
    document.removeEventListener("keydown", this.keydownListener);
  };
}

class InitialScreen extends Screen {
  constructor() {
    super();
    this.setElement();
    this.addEventListeners();
  }

  setElement = () => {
    this.element = document.createElement("div");
    this.element.classList.add("initial-screen");

    this.title = document.createElement("h1");
    this.title.classList.add("initial-screen__title");
    this.title.innerText = "River Raid";

    this.h2 = document.createElement("h2");
    this.h2.classList.add("initial-screen__subtitle");
    this.h2.innerText = "Aperte qualquer tecla para começar";

    this.element.appendChild(this.title);
    this.element.appendChild(this.h2);

    document.querySelector("[wm-game]").appendChild(this.element);
  };

  next = () => {
    this.removeEventListeners();
    this.element.classList.add("initial-screen__animation");

    setTimeout(() => {
      document.querySelector("[wm-game]").removeChild(this.element);
      this.callback(new GameScreen(this));
    }, 1500);
  };

  keydownListener = () => {
    this.next();
  };
}

class GameScreen extends Screen {
  constructor(beforeScreen) {
    super();
    this.addEventListeners();

    if (beforeScreen instanceof GameOverScreen) {
      game.reset();
    }

    game.setGameOverCallback(this.next);
    game.start();
  }

  next = () => {
    this.removeEventListeners();
    this.callback(new GameOverScreen());
  };

  keydownListener = (command) => {
    const keyPressed = command.key;

    const keydownActions = {
      a: () => game.controlls.movePlayerLeft(),
      d: () => game.controlls.movePlayerRight(),
      ArrowLeft: () => game.controlls.movePlayerLeft(),
      ArrowRight: () => game.controlls.movePlayerRight(),
    };

    const action = keydownActions[keyPressed];
    if (action === undefined) return;

    action();
  };
}

class GameOverScreen extends Screen {
  constructor() {
    super();
    this.addEventListeners();
    this.setElement();
  }

  setElement = () => {
    this.element = document.createElement("div");
    this.element.classList.add("game-over-screen");

    this.title = document.createElement("h1");
    this.title.classList.add("game-over-screen__title");
    this.title.innerText = "Game Over";

    this.h2 = document.createElement("h2");
    this.h2.classList.add("game-over-screen__subtitle");
    this.h2.innerText = "Aperte espaço para jogar novamente";

    this.element.appendChild(this.title);
    this.element.appendChild(this.h2);

    document.querySelector("[wm-game]").appendChild(this.element);
  };

  next = () => {
    this.removeEventListeners();
    this.element.classList.add("game-over-screen__animation");

    setTimeout(() => {
      document.querySelector("[wm-game]").removeChild(this.element);
      this.callback(new GameScreen(this));
    }, 600);
  };

  keydownListener = (command) => {
    const keyPressed = command.key;

    if (keyPressed !== " ") return;

    this.next();
  };
}
