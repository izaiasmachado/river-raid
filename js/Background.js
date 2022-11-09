// a pile of levels for the background to scroll through
function Background(width, height) {
  return {
    levels: [],
    size: {
      width,
      height,
    },
    addLevel: function (level) {
      this.levels.push(level);
    },
    removeLevel: function () {
      this.levels.pop();
    },
  };
}
