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

const asyncFunction = async (delay, message) => {
    return new Promise(resolve => setTimeout(() => {
        print(message);
        resolve(message);
    }, delay));
};

const fetchData = async function*() {
    const data = ['data1', 'data2', 'data3'];
    for (const item of data) {
        yield await asyncFunction(1000, `Fetched: ${item}`);
    }
};

(async () => {
    const emitter = new EventEmitter();
    emitter.on('dataFetched', (data) => print(`Listener received: ${data}`));
    
    for await (const data of fetchData()) {
        emitter.emit('dataFetched', data);
    }
    
    const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
    const weakMap = new WeakMap();
    const obj = {};
    weakMap.set(obj, 'weakValue');
    
    print(map.get('key1'));  
    print(weakMap.get(obj));  

    print('All operations completed.');
})();
