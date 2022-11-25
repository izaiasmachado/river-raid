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

    this.statistics = document.createElement("div");
    this.statistics.classList.add("game-over-screen__statistics");

    this.score = document.createElement("p");
    this.score.classList.add("game-over-screen__score");
    this.score.innerText = `Pontuação Total: ${game.player.points}`;

    this.level = document.createElement("p");
    this.level.classList.add("game-over-screen__level");
    this.level.innerText = `Nível: ${game.player.levelsBeat}`;

    this.timesAteFood = document.createElement("p");
    this.timesAteFood.classList.add("game-over-screen__times-ate-food");
    this.timesAteFood.innerText = `Ramens: ${game.player.timesAteFood}`;

    this.timesPickedUpCoin = document.createElement("p");
    this.timesPickedUpCoin.classList.add(
      "game-over-screen__times-picked-up-coin"
    );
    this.timesPickedUpCoin.innerText = `Esferas do Dragão: ${game.player.coinsPicked}`;

    this.statistics.appendChild(this.score);
    this.statistics.appendChild(this.level);
    this.statistics.appendChild(this.timesAteFood);
    this.statistics.appendChild(this.timesPickedUpCoin);

    this.element.appendChild(this.title);
    this.element.appendChild(this.h2);
    this.element.appendChild(this.statistics);

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
