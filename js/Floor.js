class Floor extends Tile {
  constructor(x, y) {
    super(x, y);
    this.element.classList.add("floor");
    this.isFloor = true;
    this.hasFood = false;
  }

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
