 

class PubSub {
  constructor() {
    this.topics = new Map();
    this.proxyTopics = new Proxy(this.topics, {
      get(target, topic) {
        if (!target.has(topic)) {
          target.set(topic, []);
        }
        return target.get(topic);
      }
    });
  }

  publish(topic, data) {
    if (this.proxyTopics[topic]) {
      this.proxyTopics[topic].forEach(subscriber => subscriber(data));
    }
  }

  subscribe(topic, subscriber) {
    this.proxyTopics[topic].push(subscriber);
  }

  async *subscribeAsync(topic) {
    const topicQueue = this.proxyTopics[topic];
    while (true) {
      await new Promise(resolve => {
        const wrapper = (data) => {
          subscriber.next(data);
          resolve();
        };
        topicQueue.push(wrapper);
      });
      yield;
    }
  }
}

const pubsub = new PubSub();

 
pubsub.subscribe('news', data => print(`Received news: ${data}`));

 
(async () => {
  const asyncIterator = pubsub.subscribeAsync('weather');
  for await (let data of asyncIterator) {
    print(`Weather update: ${data}`);
  }
})();

 
pubsub.publish('news', 'Breaking News: Advanced JavaScript features demonstrated!');
pubsub.publish('weather', 'Sunny, 25°C');
