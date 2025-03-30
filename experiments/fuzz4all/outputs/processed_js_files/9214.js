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

 
const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
};

 
const dynamicObject = new Proxy({}, {
    get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} not found`;
    }
});

 
async function* asyncGenerator() {
    for (let i = 0; i < 3; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
    }
}

 
async function handleAsyncTasks() {
    const asyncTasks = Array.from(asyncGenerator());
    const results = await Promise.allSettled(asyncTasks);
    results.forEach((result, index) => {
        print(`Task ${index}: ${result.status === 'fulfilled' ? result.value : result.reason}`);
    });
}

 
const emitter = new EventEmitter();
emitter.on('test', debounce((message) => print(`Debounced: ${message}`), 500));

emitter.emit('test', 'Hello');
emitter.emit('test', 'World');

dynamicObject.newProperty = 'I exist';
print(dynamicObject.newProperty);   
print(dynamicObject.nonExistentProperty);   

handleAsyncTasks();
