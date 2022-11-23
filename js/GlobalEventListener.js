let instance = null;

class EventListener {
  constructor() {
    this.observers = [];

    if (instance) {
      return instance;
    }

    instance = this;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => observer !== obs);
  }

  notifyAll(command) {
    this.observers.forEach((observer) => observer.notify(command));
  }
}

function GlobalEventListener() {
  return new EventListener();
}
