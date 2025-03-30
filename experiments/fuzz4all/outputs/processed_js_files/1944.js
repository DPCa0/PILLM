class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    
    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(listener);
    }
    
    emit(event, ...args) {
        if (this.listeners.has(event)) {
            for (let listener of this.listeners.get(event)) {
                listener(...args);
            }
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

function* idGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
}

const emitter = new EventEmitter();
const generateId = idGenerator();

const dataProxy = new Proxy({}, {
    get(target, prop) {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
});

emitter.on('dataFetched', (data) => {
    print('Data fetched:', data);
    dataProxy[generateId.next().value] = data;
});

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        emitter.emit('dataFetched', data);
    } catch (error) {
        console.error('Fetching data failed:', error);
    }
})();
