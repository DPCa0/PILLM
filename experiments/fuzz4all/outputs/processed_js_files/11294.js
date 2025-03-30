class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(subscriber) {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers.delete(subscriber);
  }

  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function complexFeatureDemo() {
  const observable = new Observable();

  const subscriber1 = async (data) => {
    print(`Subscriber 1 received: ${data}`);
    await sleep(1000);
    print(`Subscriber 1 processed: ${data}`);
  };

  const subscriber2 = (data) => {
    print(`Subscriber 2 received: ${data}`);
    print(`Subscriber 2 processed: ${data.toUpperCase()}`);
  };

  observable.subscribe(subscriber1);
  observable.subscribe(subscriber2);

  print('Starting notifications...');

  ['Event 1', 'Event 2', 'Event 3'].forEach(event => {
    observable.notify(event);
  });

  await sleep(2000);
  print('Unsubscribing subscriber 1...');
  observable.unsubscribe(subscriber1);

  ['Event 4', 'Event 5'].forEach(event => {
    observable.notify(event);
  });
})();
