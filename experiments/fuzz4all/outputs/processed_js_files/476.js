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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
        await sleep(1000);
    }
}

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('data', data => print('Data received:', data));
    eventEmitter.on('data', data => print('Data processed:', data * 2));

    for await (let data of infiniteSequence()) {
        eventEmitter.emit('data', data);
        if (data >= 5) break;  
    }
})();
