class Floor extends Tile {
  constructor() {
    super();
    this.element.classList.add("floor");
    this.isFloor = true;
    this.hasFood = false;

    this.giveChanceAddFood();
  }

  giveChanceAddFood = () => {
    if (Math.random() * 100 >= FLOOR_CHANCE_ADD_FOOD) return;
    this.addFood();
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
}
