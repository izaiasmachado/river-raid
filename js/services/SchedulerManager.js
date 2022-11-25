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
