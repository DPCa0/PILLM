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
        this.subscribers.forEach(subscriber => subscriber(data));
    }
}

function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

const fibonacciObservable = new Observable();

fibonacciObservable.subscribe(debounce(data => {
    print(`Received Fibonacci data: ${data}`);
}, 500));

(async () => {
    try {
        const data = await fetchData('https://api.example.com/data');
        fibonacciObservable.notify(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
})();

const fibSequence = [...fibonacciGenerator(10)];
print(`Fibonacci sequence up to 10 terms: ${fibSequence}`);
