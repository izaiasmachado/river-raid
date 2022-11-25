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
