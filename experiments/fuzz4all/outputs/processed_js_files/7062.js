class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

class DataStore {
    #data = new WeakMap();

    set(key, value) {
        let store = this.#data.get(key) || {};
        store.value = value;
        this.#data.set(key, store);
    }

    get(key) {
        return (this.#data.get(key) || {}).value;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const eventEmitter = new EventEmitter();
    const dataStore = new DataStore();

    eventEmitter.on('dataUpdated', async (key, value) => {
        print(`Updating data for key: ${key}`);
        await delay(1000);
        dataStore.set(key, value);
        print(`Data updated for key: ${key}`);
    });

    eventEmitter.on('dataFetch', async (key) => {
        print(`Fetching data for key: ${key}`);
        await delay(500);
        const value = dataStore.get(key);
        print(`Data fetched for key: ${key}, value: ${value}`);
    });

     
    eventEmitter.emit('dataUpdated', 'user', { name: 'Alice', age: 30 });
    eventEmitter.emit('dataFetch', 'user');
})();
