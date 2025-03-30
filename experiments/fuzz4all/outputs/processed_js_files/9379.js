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

    once(event, listener) {
        const tempListener = (...args) => {
            listener(...args);
            this.off(event, tempListener);
        };
        this.on(event, tempListener);
    }

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
            this.events.set(event, listeners);
        }
    }
}

 
const targetObject = { foo: 42 };
const handler = {
    get(target, prop) {
        return prop in target ? target[prop] : `Property "${prop}" doesn't exist`;
    },
    set(target, prop, value) {
        if (typeof value === 'number') {
            target[prop] = value;
        } else {
            throw new TypeError('Value must be a number');
        }
    }
};

const proxy = new Proxy(targetObject, handler);

// Using Symbol to create a unique identifier
const uniqueID = Symbol('uniqueID');
const user = {
    [uniqueID]: '12345',
    name: 'Alice'
};

// Async function using Promises
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

// Sample usage
const emitter = new EventEmitter();
emitter.on('greet', name => print(`Hello, ${name}!`));
emitter.emit('greet', 'world');

try {
    proxy.foo = 'hello'; // This should throw an error
} catch (e) {
    console.error(e);
}

print(proxy.foo); // Outputs: 42
print(proxy.bar); // Outputs: Property "bar" doesn't exist

(async () => {
    const url = 'https: 