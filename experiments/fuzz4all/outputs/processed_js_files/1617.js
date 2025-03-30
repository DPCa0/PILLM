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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithTimeout = async (url, timeout) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
};

const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

const complexCalculation = memoize((a, b) => {
    print('Executing complex calculation...');
    return a ** b + b ** a;
});

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('data', data => print('Received:', data));
    eventEmitter.on('error', err => console.error('Error:', err));
    
    try {
        print('Complex calculation result:', complexCalculation(2, 3));
        print('Complex calculation result:', complexCalculation(2, 3));  
        
        const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 5000);
        eventEmitter.emit('data', data);
        
        await sleep(1000);
        eventEmitter.emit('data', { message: 'Task completed' });
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();
