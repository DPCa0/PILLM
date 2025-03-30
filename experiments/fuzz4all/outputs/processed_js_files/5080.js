class Observable {
    constructor() {
        this.subscribers = new Set();
    }

    subscribe(fn) {
        this.subscribers.add(fn);
    }

    unsubscribe(fn) {
        this.subscribers.delete(fn);
    }

    notify(data) {
        this.subscribers.forEach(fn => fn(data));
    }
}

const observable = new Observable();

const createLogger = label => data => print(`${label}: ${data}`);

const logger1 = createLogger('Logger1');
const logger2 = createLogger('Logger2');

observable.subscribe(logger1);
observable.subscribe(logger2);

 
observable.notify('Hello, Observers!');

 
function* dataGenerator() {
    yield Promise.resolve('First piece of data');
    yield Promise.resolve('Second piece of data');
    yield Promise.resolve('Third piece of data');
}

async function processData(generator) {
    for await (const data of generator) {
        print(`Processed: ${data}`);
    }
}

const generator = dataGenerator();
processData(generator);

 
const targetObject = {
    a: 1,
    b: 2
};

const handler = {
    get(target, property) {
        print(`Accessed property: ${property}`);
        return property in target ? target[property] : `Property ${property} not found`;
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const proxy = new Proxy(targetObject, handler);

print(proxy.a);  
proxy.b = 3;  
print(proxy.c);  
