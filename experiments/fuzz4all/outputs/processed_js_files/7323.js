class AsyncTimer {
  constructor(seconds) {
    this.seconds = seconds;
  }

  startTimer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Time's up after ${this.seconds} second(s)!`);
      }, this.seconds * 1000);
    });
  }
}

async function runTimers(timers) {
  const results = await Promise.all(timers.map(timer => timer.startTimer()));
  results.forEach(result => print(result));
}

const nums = [1, 2, 3, 4, 5];
const timers = nums.map(num => new AsyncTimer(num));

runTimers(timers);

// Using a Proxy for observing array changes
const arrayHandler = {
  get(target, property) {
    if (property === 'push') {
      return function(...args) {
        print(`Adding: ${args}`);
        return Array.prototype.push.apply(target, args);
      };
    }
    return Reflect.get(target, property);
  }
};

const observableArray = new Proxy([], arrayHandler);

observableArray.push('apple');
observableArray.push('banana');

// Using a Symbol for a unique object property
const uniqueKey = Symbol('unique');
const myObject = {
  name: 'Test Object',
  [uniqueKey]: 'Secret Value'
};

print(myObject.name); // Test Object
print(myObject[uniqueKey]); // Secret Value

print(Object.keys(myObject)); // ['name']
print(Object.getOwnPropertySymbols(myObject));  
