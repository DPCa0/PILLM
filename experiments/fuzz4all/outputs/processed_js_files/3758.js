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
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

 
const user = {
    name: 'Alice',
    age: 30
};

const handler = {
    get(target, property, receiver) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return Reflect.get(...arguments);
        } else {
            print(`Property ${property} not found.`);
            return undefined;
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

const proxyUser = new Proxy(user, handler);

 
const fetchData = async () => {
    const dataPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: 'some data' });
        }, 1000);
    });

    const result = await dataPromise;
    print('Data received:', result.data);
};

 
const emitter = new EventEmitter();
emitter.on('greet', (name) => {
    print(`Hello, ${name}!`);
});
emitter.emit('greet', proxyUser.name);

proxyUser.name = 'Bob';
fetchData();
