class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(callback) {
    this.subscribers.add(callback);
  }
  
  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }
  
  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const observable = new Observable();

observable.subscribe(data => print(`Subscriber 1 received: ${data}`));
observable.subscribe(data => print(`Subscriber 2 received: ${data}`));

const fibGen = fibonacciGenerator();
let count = 0;
const interval = setInterval(() => {
  if (count >= 10) {
    clearInterval(interval);
  } else {
    const fibNumber = fibGen.next().value;
    observable.notify(fibNumber);
    count++;
  }
}, 500);
