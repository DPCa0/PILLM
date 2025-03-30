 
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const myEmitter = new EventEmitter();
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

async function main() {
  myEmitter.on('log', message => print(`Log: ${message}`));
  
  const numbers = [...range(1, 5)];
  for (const num of numbers) {
    await delay(500);
    myEmitter.emit('log', `Number: ${num}`);
  }

  const mapAsync = async (arr, callback) => Promise.all(arr.map(callback));
  const result = await mapAsync(numbers, async num => {
    await delay(300);
    return num * num;
  });

  myEmitter.emit('log', `Squared Numbers: ${result.join(', ')}`);
}

main();
