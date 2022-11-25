class Wall extends Tile {
  constructor(x, y) {
    super(x, y);
    this.element.classList.add("wall");
    this.isWall = true;
    this.giveChanceAddTree();
  }

  giveChanceAddTree = () => {
    if (Math.random() * 100 >= WALL_CHANCE_ADD_TREE) return;
    this.addTree();
  };

  addTree = () => {
    const tree = document.createElement("div");
    tree.classList.add("tree");

    const treeImg = document.createElement("img");
    treeImg.src = "img/dead-tree.png";
    tree.appendChild(treeImg);

    this.element.appendChild(tree);
  };
}
