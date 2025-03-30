class Emitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, new Set());
        }
        this.#events.get(event).add(listener);
    }

    emit(event, ...args) {
        const listeners = this.#events.get(event);
        if (listeners) {
            for (const listener of listeners) {
                listener(...args);
            }
        }
    }

    off(event, listener) {
        const listeners = this.#events.get(event);
        if (listeners) {
            listeners.delete(listener);
        }
    }
}

const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
}

const emitter = new Emitter();

emitter.on('dataFetched', debounce((data) => {
    print('Data received:', data);
}, 300));

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        emitter.emit('dataFetched', data);
    } catch (error) {
        console.error('Fetching data failed:', error);
    }
})();
