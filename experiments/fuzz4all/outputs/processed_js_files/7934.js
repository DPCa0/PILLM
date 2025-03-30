const fetchUserData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const eventEmitter = new EventEmitter();

const processUserData = async () => {
  const data = await fetchUserData('https://jsonplaceholder.typicode.com/users');
  eventEmitter.emit('dataProcessed', data);
};

eventEmitter.on('dataProcessed', (data) => {
  print('User Data Processed:', data.map(user => user.name).join(', '));
});

processUserData();

const runAsyncFunctions = async (funcs) => {
  const results = [];
  for (let func of funcs) {
    results.push(await func());
  }
  return results;
};

const asyncFunc1 = async () => 'Result 1';
const asyncFunc2 = async () => 'Result 2';

runAsyncFunctions([asyncFunc1, asyncFunc2]).then(console.log);
