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
            for (let listener of this.events.get(event)) {
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

const asyncOperation = (ms) => {
    return new Promise((resolve) => setTimeout(() => resolve(`Completed in ${ms}ms`), ms));
};

async function complexAsyncFlow() {
    const results = await Promise.allSettled([
        asyncOperation(1000),
        asyncOperation(1500),
        asyncOperation(2000)
    ]);

    return results.map(result => {
        if (result.status === 'fulfilled') {
            return result.value;
        } else {
            throw new Error('Operation failed');
        }
    });
}

const emitter = new EventEmitter();

emitter.on('result', result => {
    print(`Received result: ${result}`);
});

emitter.on('error', error => {
    console.error(`Error occurred: ${error}`);
});

(async () => {
    try {
        const results = await complexAsyncFlow();
        for (let result of results) {
            emitter.emit('result', result);
        }
    } catch (error) {
        emitter.emit('error', error.message);
    }
})();
