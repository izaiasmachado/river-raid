// event listener for a and s
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
};
document.addEventListener("keydown", function (event) {
  if (events[event.key]) {
    events[event.key].keydown();
  }
});
