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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator() {
    const items = ['a', 'b', 'c', 'd'];
    for (const item of items) {
        await sleep(1000);
        yield item.toUpperCase();
    }
}

(async () => {
    const emitter = new EventEmitter();

    emitter.on('data', data => print(`Received: ${data}`));
    emitter.on('end', () => print('No more data.'));

    const gen = asyncGenerator();

    for await (const data of gen) {
        emitter.emit('data', data);
    }

    emitter.emit('end');
})();
