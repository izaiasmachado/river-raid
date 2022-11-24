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
schedulers.add(detectCollisions, 10);
schedulers.add(updateBackground, 25);
schedulers.add(isPlayerAlive, 100);
schedulers.add(decreaseEnergy, 1000);
schedulers.start();

function detectCollisions() {
  game.controlls.detectPlayerWallCollision((tile) => {
    tile.element.classList.add("blink");
    game.player.die();
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
