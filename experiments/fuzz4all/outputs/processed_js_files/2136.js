class Observable {
  constructor(value) {
    this._value = value;
    this.subscribers = new Set();
  }
  
  get value() {
    return this._value;
  }
  
  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this.notify();
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
  }
  
  notify() {
    this.subscribers.forEach(callback => callback(this._value));
  }
}

function* range(start, end) {
  let current = start;
  while (current < end) {
    yield current++;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  const obs = new Observable(0);

  obs.subscribe(value => print(`New value: ${value}`));

  for await (const num of range(1, 5)) {
    obs.value = num;
    await delay(500);
  }

  print('Observable sequence completed.');
}

main();
