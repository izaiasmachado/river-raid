function Player(x = 0, y = 0) {
  const element = document.createElement("div");
  element.classList.add("player");

  const img = document.createElement("img");
  img.src = "img/goku.gif";
  element.appendChild(img);

  element.style.left = x + "px";
  element.style.top = y + "px";

  this.size = { width: 80, height: 80 };

  element.style.position = "absolute";
  element.style.width = this.size.width + "px";
  element.style.height = this.size.height + "px";

  this.element = element;
  this.name = "Goku";
  this.coordinate = { x, y };

  this.setCoordinate = (x, y) => {
    this.coordinate = { x, y };
    this.element.style.left = this.coordinate.x + "px";
    this.element.style.top = this.coordinate.y + "px";
  };

  this.moveLeft = () => this.move(-30, 0);
  this.moveRight = () => this.move(30, 0);
}
