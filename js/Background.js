function Background(width, height) {
  this.element = document.createElement("div");
  this.element.classList.add("background");

  this.element.style.width = width + "px";
  this.element.style.height = height + "px";
  this.levels = [];
  this.size = {
    width,
    height,
  };

  this.addLevel = function (level) {
    this.levels.push(level);
  };
  this.removeLevel = function () {
    this.levels.pop();
  };
}
