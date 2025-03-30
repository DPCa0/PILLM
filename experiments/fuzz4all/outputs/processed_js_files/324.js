class AsyncEventEmitter {
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
        return Promise.all((this.events.get(event) || []).map(listener => listener(...args)));
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function* asyncGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        await delay(1000);
        yield i;
    }
}

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
    print(`Received: ${data}`);
    if (data % 2 === 0) {
        await delay(500);
        print(`Processed even number: ${data}`);
    }
});

(async () => {
    for await (const number of asyncGenerator(5)) {
        await emitter.emit('data', number);
    }
})();
