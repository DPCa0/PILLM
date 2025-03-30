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
            this.events.get(event).forEach(listener => listener.apply(this, args));
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

const asyncOperation = () => new Promise((resolve) => {
    setTimeout(() => resolve('Async Result'), 1000);
});

async function* generateAsyncResults() {
    const result = await asyncOperation();
    yield result;
    yield 'Second Result';
    yield 'Third Result';
}

async function handleAsyncResults() {
    const asyncGen = generateAsyncResults();
    for await (const result of asyncGen) {
        print(`Yielded: ${result}`);
    }
}

function createProxy(target) {
    return new Proxy(target, {
        get(obj, prop) {
            if (prop in obj) {
                print(`Getting ${prop}: ${obj[prop]}`);
                return obj[prop];
            } else {
                print(`Property ${prop} does not exist`);
                return undefined;
            }
        },
        set(obj, prop, value) {
            print(`Setting ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    });
}

const eventEmitter = new EventEmitter();
const user = createProxy({ name: 'John', age: 30 });

eventEmitter.on('greet', (greeting) => print(`${greeting}, ${user.name}!`));
eventEmitter.emit('greet', 'Hello');

handleAsyncResults();

user.name = 'Jane';
print(user.name);
print(user.height);
