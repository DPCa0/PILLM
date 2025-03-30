class PubSub {
  constructor() {
    this.topics = {};
  }

  subscribe(topic, listener) {
    if (!this.topics[topic]) {
      this.topics[topic] = new Set();
    }
    this.topics[topic].add(listener);
  }

  publish(topic, data) {
    if (!this.topics[topic]) return;
    for (const listener of this.topics[topic]) {
      listener(data);
    }
  }

  unsubscribe(topic, listener) {
    if (!this.topics[topic]) return;
    this.topics[topic].delete(listener);
  }
}

const pubsub = new PubSub();

const asyncFunction = async (msg) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  print(`Received asynchronously: ${msg}`);
};

pubsub.subscribe('greet', asyncFunction);

(async () => {
  pubsub.publish('greet', 'Hello, world!');

  const doubleMap = new Proxy(
    new Map(),
    {
      get: (target, prop) => (typeof target[prop] === 'function' ? target[prop].bind(target) : target[prop]),
      set: (target, prop, value) => {
        if (typeof value === 'number') {
          target[prop] = value * 2;
        } else {
          target[prop] = value;
        }
        return true;
      }
    }
  );

  doubleMap.set('age', 21);
  print(`Age doubled: ${doubleMap.get('age')}`);

  const performAsync = async () => {
    const result = await Promise.resolve('Completed');
    print(result);
  };

  await performAsync();
})();
