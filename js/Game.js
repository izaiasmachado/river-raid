function Game() {
  this.addPlayer = function () {
    this.player = new Player();
    const x = this.background.size.width / 2 - this.player.size.width / 2;
    const y = this.background.size.height - this.player.size.height - 150;

    console.log(x, y);
    this.player.setCoordinate(x, y);

    const playerElement = this.player.element;
    this.element.appendChild(playerElement);

    const background = this.background;

    this.player.move = function (x, y) {
      console.log(background);
      console.log(this);

      const player = this;
      this.coordinate = nextCoordinate(player, background, { x, y });
      this.setCoordinate(this.coordinate.x, this.coordinate.y);

      console.log("aquii", JSON.stringify(this.coordinate));
      console.log(this.element.style.left, this.element.style.top);
    };
  };

  this.setBackground = function () {
    this.background = new Background(800, 600);
    this.element = document.querySelector("[wm-game]");
    this.element.appendChild(this.background.element);
  };

  this.setBackground();
  this.addPlayer();

  console.log(this.element);
}

function nextCoordinate(player, background, move) {
  const { x: playerX, y: playerY } = player.coordinate;
  let nextX = playerX + move.x;
  let nextY = playerY + move.y;

  if (nextX < 0 || nextX + player.size.width > background.size.width) {
    nextX = playerX;
  }

  if (nextY < 0 || nextY + player.size.height > background.size.height) {
    nextY = playerY;
  }

  return { x: nextX, y: nextY };
}
