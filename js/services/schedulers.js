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

const schedulers = new SchedulerManager();
schedulers.add(detectCollisions, DETECT_COLLISIONS_DELAY_MS);
schedulers.add(updateBackground, UPDATE_BACKGROUND_DELAY_MS);
schedulers.add(isPlayerAlive, VERIFY_PLAYER_ALIVE_DELAY_MS);
schedulers.add(decreaseEnergy, DECREASE_ENERGY_DELAY_MS);
schedulers.start();

const wallCollision = (tile) => {
  tile.element.classList.add("blink");
  game.player.die();
};

const foodCollision = (tile) => {
  game.player.eat();
  tile.removeFood();
};

function detectCollisions() {
  game.controlls.detectCollisions((tile) => {
    if (tile.isWall) return wallCollision(tile);
    if (tile.hasFood) return foodCollision(tile);
  });
}

function updateBackground() {
  if (!game.player.isAlive()) return;
  game.background.update();
}

function isPlayerAlive() {
  if (!game.player.isAlive()) {
    schedulers.stop();
  }
}

function decreaseEnergy() {
  game.player.decreaseEnergy();
}
