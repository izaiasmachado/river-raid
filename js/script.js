const game = new Game();

class InitialScreen {
  constructor() {
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

  setCallback = (callback) => {
    this.callback = callback;
  };

  nextScreen = () => {
    this.removeEventListeners();
    this.element.classList.add("initial-screen__animation");

    setTimeout(() => {
      document.querySelector("[wm-game]").removeChild(this.element);
      this.callback(new GameScreen(this));
    }, 1500);
  };

  addEventListeners = () => {
    document.addEventListener("keydown", this.nextScreen);
  };

  removeEventListeners = () => {
    document.removeEventListener("keydown", this.nextScreen);
  };
}

const keydownListener = (command) => {
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

class GameScreen {
  constructor(beforeScreen) {
    if (beforeScreen instanceof GameOverScreen) {
      game.reset();
    }

    game.setGameOverCallback(this.nextScreen);
    game.start();
    this.addEventListeners();
  }

  setCallback = (callback) => {
    this.callback = callback;
  };

  nextScreen = () => {
    this.removeEventListeners();
    this.callback(new GameOverScreen());
  };

  addEventListeners = () => {
    document.addEventListener("keydown", keydownListener);
  };

  removeEventListeners = () => {
    document.removeEventListener("keydown", keydownListener);
  };
}

class GameOverScreen {
  constructor() {
    this.setElement();
    console.log("Game Over");
  }

  setElement = () => {
    this.element = document.createElement("div");
    this.element.classList.add("game-over-screen");

    this.title = document.createElement("h1");
    this.title.classList.add("game-over-screen__title");
    this.title.innerText = "Game Over";

    // this.h2 = document.createElement("h2");
    // this.h2.classList.add("game-over-screen__subtitle");
    // this.h2.innerText = "Aperte qualquer tecla para jogar novamente";

    this.element.appendChild(this.title);
    // this.element.appendChild(this.h2);

    document.querySelector("[wm-game]").appendChild(this.element);
  };

  setCallback = (callback) => {
    this.callback = callback;
  };

  nextScreen = () => {
    this.removeEventListeners();
    this.element.classList.add("game-over-screen__animation");

    setTimeout(() => {
      document.querySelector("[wm-game]").removeChild(this.element);
      this.callback(new GameScreen(this));
    }, 1500);
  };

  addEventListeners = () => {
    document.addEventListener("keydown", this.nextScreen);
  };

  removeEventListeners = () => {
    document.removeEventListener("keydown", this.nextScreen);
  };
}

async function startGame() {
  let nextScreen = new InitialScreen();

  while (true) {
    const nextScreenPromise = new Promise((resolve) => {
      nextScreen.setCallback(resolve);
    });

    nextScreen.addEventListeners();

    nextScreen = await nextScreenPromise;
  }
}

startGame();
