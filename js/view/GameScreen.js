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
