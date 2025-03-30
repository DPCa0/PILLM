class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncOperation = async () => {
  print("Starting async operation...");
  await delay(1000);
  print("Async operation complete.");
};

(async () => {
  const eventEmitter = new EventEmitter();

  const listener = async () => {
    await asyncOperation();
  };

  eventEmitter.on("dataReceived", listener);

  print("Emitting event...");
  eventEmitter.emit("dataReceived");

  print("Removing listener...");
  eventEmitter.off("dataReceived", listener);

  print("Re-emitting event (no listeners should be present)...");
  eventEmitter.emit("dataReceived");
})();
