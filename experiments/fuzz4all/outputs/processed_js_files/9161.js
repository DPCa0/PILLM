class DataEmitter {
    #listeners = new Map();

    constructor(initialData = {}) {
        this.data = new Proxy(initialData, {
            set: (target, key, value) => {
                target[key] = value;
                this.#notify(key, value);
                return true;
            },
        });
    }

    on(event, listener) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, new Set());
        }
        this.#listeners.get(event).add(listener);
    }

    off(event, listener) {
        if (this.#listeners.has(event)) {
            this.#listeners.get(event).delete(listener);
        }
    }

    #notify(event, value) {
        if (this.#listeners.has(event)) {
            this.#listeners.get(event).forEach(listener => listener(value));
        }
    }
}

(async () => {
    const fetchData = () => new Promise(resolve => setTimeout(() => {
        resolve({ time: new Date().toLocaleTimeString() });
    }, 1000));

    const emitter = new DataEmitter();
    emitter.on('time', newTime => print(`Updated time: ${newTime}`));

    while (true) {
        const data = await fetchData();
        emitter.data.time = data.time;
        await new Promise(resolve => setTimeout(resolve, 3000));  
    }
})();
