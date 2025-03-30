class PubSub {
  #subscribers = new Map();
  
  subscribe(event, callback) {
    if (!this.#subscribers.has(event)) {
      this.#subscribers.set(event, []);
    }
    this.#subscribers.get(event).push(callback);
  }

  publish(event, data) {
    if (this.#subscribers.has(event)) {
      this.#subscribers.get(event).forEach(callback => callback(data));
    }
  }
}

const asyncProcess = async (num) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(num * num), 1000);
  });
};

(async () => {
  const pubSub = new PubSub();
  
  pubSub.subscribe('completed', result => print(`Process complete with result: ${result}`));
  
  const numbers = [1, 2, 3, 4];
  
  const results = await Promise.all(
    numbers.map(async (number) => {
      const result = await asyncProcess(number);
      pubSub.publish('completed', result);
      return result;
    })
  );
  
  print('All results:', results);
})();
