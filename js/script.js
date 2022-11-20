const game = new Game();

const events = {
  a: {
    keydown: () => {
      console.log(game.player);
      game.player.moveLeft();
    },
  },
  d: {
    keydown: () => {
      game.player.moveRight();
    },
  },
  w: {
    keydown: () => {
      game.background.update();
    },
  },
};
document.addEventListener("keydown", function (event) {
  if (events[event.key]) {
    events[event.key].keydown();
  }
});
