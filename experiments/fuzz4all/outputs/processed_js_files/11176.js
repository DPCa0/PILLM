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

    off(event, listenerToRemove) {
        if (!this.#events.has(event)) return;
        this.#events.set(event, this.#events.get(event).filter(listener => listener !== listenerToRemove));
    }
}

async function* numberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

(async function main() {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('data', data => print(`Received data: ${data}`));
    eventEmitter.on('data', data => {
        if (data % 2 === 0) print(`Even number: ${data}`);
    });

    for await (const num of numberGenerator(5)) {
        eventEmitter.emit('data', num);
    }
})();
