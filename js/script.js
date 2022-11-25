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

const copyright = document.querySelector(".footer-copyright");
copyright.innerHTML = `Copyright © ${new Date().getFullYear()} - Izaias Machado`;
