 
class Observable {
    constructor() {
        this.subscribers = new Map();
    }

    subscribe(event, callback) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    }

    notify(event, data) {
        if (this.subscribers.has(event)) {
            for (const callback of this.subscribers.get(event)) {
                callback(data);
            }
        }
    }
}

function memoize(fn) {
    const cache = new WeakMap();
    return function(...args) {
        if (cache.has(args)) {
            return cache.get(args);
        }
        const result = fn(...args);
        cache.set(args, result);
        return result;
    }
}

 
const EVENT_ONE = Symbol('eventOne');
const EVENT_TWO = Symbol('eventTwo');

const observable = new Observable();

observable.subscribe(EVENT_ONE, data => {
    print('Event One triggered with data:', data);
});

observable.subscribe(EVENT_TWO, data => {
    print('Event Two triggered with data:', data);
});

const complexCalculation = memoize((a, b) => {
    print('Performing complex calculation...');
    return a ** b + Math.sqrt(a * b);
});

observable.notify(EVENT_ONE, complexCalculation(2, 3));
observable.notify(EVENT_TWO, complexCalculation(5, 10));

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print('Fetched data:', data);
    } catch (error) {
        console.error('Fetching error:', error);
    }
}

fetchData('https://jsonplaceholder.typicode.com/todos/1');
