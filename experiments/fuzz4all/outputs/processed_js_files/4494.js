class EventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, new Set());
        }
        this.#events.get(event).add(listener);
    }

    off(event, listener) {
        if (this.#events.has(event)) {
            this.#events.get(event).delete(listener);
        }
    }

    emit(event, ...args) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(listener => listener(...args));
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

function* fibonacciGenerator(limit) {
    let [prev, current] = [0, 1];
    while (limit--) {
        [prev, current] = [current, prev + current];
        yield prev;
    }
}

const emitter = new EventEmitter();
emitter.on('dataReceived', data => print('Data:', data));
emitter.on('error', error => console.error('Error:', error));

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        emitter.emit('dataReceived', data);
    } catch (error) {
        emitter.emit('error', error);
    }
})();

for (let num of fibonacciGenerator(5)) {
    print('Fibonacci:', num);
}
