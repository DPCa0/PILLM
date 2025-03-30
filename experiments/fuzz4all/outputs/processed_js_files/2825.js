class EventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.#events.has(event)) {
            this.#events.set(event, this.#events.get(event).filter(l => l !== listener));
        }
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(max) {
    let i = 0;
    while (i < max) {
        await sleep(100);
        yield i++;
    }
}

(async function main() {
    const emitter = new EventEmitter();

    emitter.on('data', data => {
        print(`Received data: ${data}`);
    });

    emitter.on('complete', () => {
        print('All data processed');
    });

    for await (const num of asyncGenerator(5)) {
        emitter.emit('data', num);
    }
    emitter.emit('complete');
})();
