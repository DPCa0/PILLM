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

const delayedExecution = async (func, delay) => {
    return new Promise(resolve => setTimeout(() => resolve(func()), delay));
}

const fetchData = async () => {
    const data = { user: 'John Doe', age: 30 };
    await delayedExecution(() => print('Data fetched:', data), 1000);
    return data;
}

(async function main() {
    const emitter = new EventEmitter();
    
    emitter.on('dataReady', data => {
        print('Processing data:', data);
    });
    
    emitter.on('dataReady', data => {
        print(`User: ${data.user}, Age: ${data.age}`);
    });
    
    print('Fetching data...');
    const data = await fetchData();
    emitter.emit('dataReady', data);
})();
