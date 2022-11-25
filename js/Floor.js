class Floor extends Tile {
  constructor(x, y) {
    super(x, y);
    this.element.classList.add("floor");
    this.isFloor = true;
    this.hasFood = false;
    this.hasPoint = false;
  }

  hasSomething = () => {
    return this.hasFood || this.hasPoint;
  };

  addFood = () => {
    this.hasFood = true;
    const floor = document.createElement("div");
    floor.classList.add("food");

    const foodImg = document.createElement("img");
    foodImg.src = "img/ramen.png";
    floor.appendChild(foodImg);

    this.element.appendChild(floor);
  };

  removeFood = () => {
    this.hasFood = false;
    this.element.querySelector(".food").remove();
  };

  addPoint = () => {
    this.hasPoint = true;

    const point = document.createElement("div");
    point.classList.add("point");

    const pointImg = document.createElement("img");
    pointImg.src = "img/dragon-ball.png";
    point.appendChild(pointImg);

    this.element.appendChild(point);
  };

  removePoint = () => {
    this.hasPoint = false;
    this.element.querySelector(".point").remove();
  };

  giveChanceAddFood = () => {
    if (this.hasSomething()) return;
    if (Math.random() * 100 >= FLOOR_CHANCE_ADD_FOOD) return;
    this.addFood();
  };

  giveChanceAddPoint = () => {
    if (this.hasSomething()) return;
    if (Math.random() * 100 >= FLOOR_CHANCE_ADD_POINT) return;
    this.addPoint();
  };
}
