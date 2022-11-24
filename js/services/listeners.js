const keydownListener = (command) => {
  const keydownActions = {
    a: () => game.controlls.movePlayerLeft(),
    d: () => game.controlls.movePlayerRight(),
    ArrowLeft: () => game.controlls.movePlayerLeft(),
    ArrowRight: () => game.controlls.movePlayerRight(),
  };

  const action = keydownActions[command.keyPressed];
  if (action === undefined) return;

  action();
};

const createListeners = () => {
  const listener = new GlobalEventListener();
  const listenerFunctions = {
    keydown: keydownListener,
  };

  const listenerTypes = Object.keys(listenerFunctions);

  listenerTypes.forEach((listenerType) => {
    const listenerFunction = listenerFunctions[listenerType];

    listener.subscribe({
      notify: (command) => {
        if (command.type !== listenerType) return;
        listenerFunction(command);
      },
    });
  });
};

createListeners();
