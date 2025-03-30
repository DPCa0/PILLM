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

const fetchData = async url => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

const memoize = fn => {
    const cache = new WeakMap();
    return function (...args) {
        if (cache.has(args[0])) return cache.get(args[0]);
        const result = fn(...args);
        cache.set(args[0], result);
        return result;
    };
};

const expensiveCalculation = x => {
    print('Performing an expensive calculation...');
    return x * x;
};

const memoizedCalculation = memoize(expensiveCalculation);

const main = async () => {
    const emitter = new EventEmitter();

    emitter.on('dataFetched', data => {
        print('Data received:', data);
    });

    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const data = await fetchData(url);

    if (data) {
        emitter.emit('dataFetched', data);
    }

    const debouncedCalculation = debounce(memoizedCalculation, 300);

    debouncedCalculation(5);
    debouncedCalculation(10);
    debouncedCalculation(5);

    print('Result:', memoizedCalculation(10));
};

main();
