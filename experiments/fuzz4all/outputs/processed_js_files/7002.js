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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function complexFlow() {
    const emitter = new EventEmitter();

     
    async function* dataGenerator() {
        let index = 0;
        while (index < 5) {
            await delay(1000);  
            yield `Data ${index++}`;
        }
    }

     
    emitter.on('data', data => print(`Received: ${data}`));

    for await (let data of dataGenerator()) {
        emitter.emit('data', data);
    }

     
    const handler = {
        get(target, prop) {
            if (prop in target) {
                print(`Accessing property "${prop}": ${target[prop]}`);
                return target[prop];
            }
            return undefined;
        }
    };

    const obj = { name: "JavaScript", version: "ES6+" };
    const proxy = new Proxy(obj, handler);

    print(proxy.name);
    print(proxy.version);
}

complexFlow().catch(console.error);
