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
