class EventEmitter {
    #listeners = new Map();
    
    on(event, listener) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, []);
        }
        this.#listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.#listeners.has(event)) {
            for (const listener of this.#listeners.get(event)) {
                listener(...args);
            }
        }
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

(async () => {
    const eventEmitter = new EventEmitter();
    
    const logData = data => print('Fetched Data:', data);
    eventEmitter.on('dataFetched', logData);

    const debouncedLog = debounce(logData, 2000);
    
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    eventEmitter.emit('dataFetched', data);
    debouncedLog(data);

    const fibSequence = [...fibonacciGenerator(10)];
    print('Fibonacci Sequence:', fibSequence);
})();
