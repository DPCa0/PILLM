class EventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, new Set());
        }
        this.#events.get(event).add(listener);
    }

    emit(event, ...args) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.#events.has(event)) {
            this.#events.get(event).delete(listener);
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncGenerator = async function* (max = 5) {
    let count = 0;
    while (count < max) {
        yield count++;
        await delay(1000);
    }
};

(async () => {
    const emitter = new EventEmitter();
    emitter.on('data', data => print(`Received: ${data}`));

    for await (let value of asyncGenerator()) {
        emitter.emit('data', value);
        if (value === 3) {
            print('Detaching listener after value 3');
            emitter.off('data', console.log);
        }
    }

    print('Done processing asyncGenerator');
})();
