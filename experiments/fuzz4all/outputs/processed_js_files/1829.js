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

function asyncOperation(result) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve(result) : reject(new Error("Failed"));
        }, 1000);
    });
}

(async function complexFunctionality() {
    const emitter = new EventEmitter();

    emitter.on('success', result => {
        print(`Success: ${result}`);
    });

    emitter.on('error', err => {
        console.error(`Error: ${err.message}`);
    });

    const numbers = [1, 2, 3, 4, 5];
    const promises = numbers.map(num => asyncOperation(num).catch(err => err));

    try {
        const results = await Promise.allSettled(promises);
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                emitter.emit('success', result.value);
            } else {
                emitter.emit('error', result.reason);
            }
        });
    } catch (err) {
        console.error('Unexpected error:', err);
    }
})();
