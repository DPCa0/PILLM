 
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

const asyncOperation = async (value) => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  await delay(1000);  
  return value * value;  
};

const main = async () => {
  const observable = new Observable();

   
  async function* valueGenerator() {
    for (let i = 1; i <= 5; i++) {
      yield await asyncOperation(i);
    }
  }

  const generator = valueGenerator();

   
  for await (const squaredValue of generator) {
    observable.notify(squaredValue);
  }

   
  observable.subscribe(value => print(`Squared Value: ${value}`));
};

main();
