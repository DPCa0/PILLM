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

 
async function fetchData() {
    return new Promise(resolve => setTimeout(() => resolve({ data: 'Sample Data' }), 1000));
}

 
const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        Reflect.set(obj, prop, value);
        emitter.emit('dataChange', prop, value);
        return true;
    }
};

const emitter = new EventEmitter();
emitter.on('dataChange', (key, value) => print(`Data changed: ${key} = ${value}`));

(async () => {
    const data = await fetchData();
    const proxyData = new Proxy(data, handler);
    
    proxyData.data = 'Updated Data';
    print(proxyData.data);
})();
