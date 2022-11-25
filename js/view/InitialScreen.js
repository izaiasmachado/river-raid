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
