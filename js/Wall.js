class Wall extends Tile {
  constructor() {
    super();
    this.element.classList.add("wall");
    this.isWall = true;
    this.giveChanceAddTree();
  }

  giveChanceAddTree = () => {
    if (Math.random() * 100 >= 5) return;
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
