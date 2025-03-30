class Observer {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(callback);
  }

  notify(event, data) {
    if (this.subscribers.has(event)) {
      for (const callback of this.subscribers.get(event)) {
        callback(data);
      }
    }
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* dataGenerator() {
  const data = ["apple", "banana", "cherry", "date"];
  for (const item of data) {
    await delay(1000);
    yield item;
  }
}

(async () => {
  const observer = new Observer();

  observer.subscribe("fruitReceived", (fruit) => {
    print(`Received: ${fruit}`);
  });

  const fruits = dataGenerator();
  for await (const fruit of fruits) {
    observer.notify("fruitReceived", fruit);
  }

  print("All fruits received.");
})();
