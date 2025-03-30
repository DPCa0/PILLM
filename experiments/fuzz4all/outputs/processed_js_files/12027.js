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

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
}

const factorial = memoize(function f(n) {
    return n <= 1 ? 1 : n * f(n - 1);
});

const myEmitter = new EventEmitter();
myEmitter.on('data', async (url) => {
    try {
        const data = await fetchData(url);
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
});

myEmitter.emit('data', 'https://api.example.com/data');

print('Factorial of 5:', factorial(5));
print('Factorial of 6:', factorial(6));
