class Scheduler {
  constructor(callback, delay) {
    this.callback = callback;
    this.delay = delay;
  }

  start = () => {
    this.isRunning = true;
    this.interval = setInterval(this.callback, this.delay);
  };

  stop = () => {
    this.isRunning = false;
    clearInterval(this.interval);
  };
}

class SchedulerManager {
  constructor() {
    this.schedulers = [];
  }

  add = (callback, delay) => {
    const scheduler = new Scheduler(callback, delay);
    this.schedulers.push(scheduler);
  };

  start = () => {
    this.schedulers.forEach((scheduler) => scheduler.start());
  };

  stop = () => {
    this.schedulers.forEach((scheduler) => scheduler.stop());
  };
}

const wallCollision = (tile) => {
  tile.element.classList.add("blink");
  game.player.die();
};

const foodCollision = (tile) => {
  game.player.eat();
  tile.removeFood();
};

const pointCollision = (tile) => {
  game.player.pickUpCoin();
  tile.removePoint();
};

function detectCollisions() {
  game.controlls.detectCollisions((tile) => {
    if (tile.isWall) return wallCollision(tile);
    if (tile.hasFood) return foodCollision(tile);
    if (tile.hasPoint) return pointCollision(tile);
  });
}

function updateBackground() {
  if (!game.player.isAlive()) return;
  game.background.update();
}

function decreaseEnergy() {
  game.player.decreaseEnergy();
}
