// const createListeners = () => {
//   const listener = new GlobalEventListener();
//   const listenerFunctions = {
//     keydown: keydownListener,
//   };

//   const listenerTypes = Object.keys(listenerFunctions);

//   listenerTypes.forEach((listenerType) => {
//     const listenerFunction = listenerFunctions[listenerType];

//     listener.subscribe({
//       notify: (command) => {
//         if (command.type !== listenerType) return;
//         listenerFunction(command);
//       },
//     });
//   });
// };

// createListeners();
