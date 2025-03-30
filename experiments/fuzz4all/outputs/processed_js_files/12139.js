class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(fn) {
    this.subscribers.add(fn);
  }
  
  unsubscribe(fn) {
    this.subscribers.delete(fn);
  }
  
  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* numberGenerator() {
  let count = 0;
  while (true) {
    await delay(500);
    yield count++;
  }
}

(async function() {
  const observable = new Observable();
  
  observable.subscribe(data => print(`Subscriber 1: ${data}`));
  observable.subscribe(data => print(`Subscriber 2: ${data}`));
  
  for await (const num of numberGenerator()) {
    observable.notify(num);
    if (num >= 5) break;
  }

  observable.unsubscribe(data => print(`Subscriber 1: ${data}`));

  print('Unsubscribed one subscriber');

  for await (const num of numberGenerator()) {
    observable.notify(num);
    if (num >= 10) break;
  }
})();
