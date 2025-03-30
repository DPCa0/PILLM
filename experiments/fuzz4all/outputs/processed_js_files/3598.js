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

const observable = new Observable();

const listener1 = (data) => print(`Listener 1: ${data}`);
const listener2 = (data) => print(`Listener 2: ${data}`);

observable.subscribe(listener1);
observable.subscribe(listener2);

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        observable.notify(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchData('https://jsonplaceholder.typicode.com/todos/1');

function* generateSequence() {
    yield 'Hello';
    yield 'world';
    yield '!';
}

const sequence = generateSequence();
for (const word of sequence) {
    print(word);
}

const cache = new Proxy({}, {
    set(target, key, value) {
        print(`Caching: ${key}`);
        target[key] = value;
        return true;
    },
    get(target, key) {
        print(`Retrieving: ${key}`);
        return target[key];
    }
});

cache['data'] = 'Sample Data';
print(cache['data']);
