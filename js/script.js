const game = new Game();

const handleKeydown = (event) => {
  const listener = new GlobalEventListener();
  const keyPressed = event.key;
  const command = {
    type: "keydown",
    keyPressed,
  };

  listener.notifyAll(command);
};

document.addEventListener("keydown", handleKeydown);
