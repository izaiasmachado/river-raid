const game = new Game();

async function startGame() {
  let nextScreen = new InitialScreen();

  while (true) {
    const nextScreenPromise = new Promise((resolve) => {
      nextScreen.setCallback(resolve);
    });

    nextScreen = await nextScreenPromise;
  }
}

startGame();
