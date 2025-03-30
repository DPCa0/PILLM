class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  
  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const complexComputation = async function* () {
  for (let i = 0; i < 3; i++) {
    yield new Promise(async (resolve) => {
      print(`Step ${i}: Starting complex computation...`);
      await delay(1000);
      print(`Step ${i}: Computation complete.`);
      resolve(i * 2);
    });
  }
};

(async () => {
  const observable = new Observable();
  
  const unsub = observable.subscribe(data => {
    print('Received:', data);
  });
  
  for await (let result of complexComputation()) {
    observable.notify(result);
  }
  
  unsub();
  print('Unsubscribed from notifications.');
})();
