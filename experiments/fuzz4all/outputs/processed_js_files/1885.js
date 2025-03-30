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
            if (this.events.get(event).size === 0) {
                this.events.delete(event);
            }
        }
    }
}

const asyncFunctionWithTimeout = (delay) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), delay);
        resolve(async () => {
            clearTimeout(timeout);
            print('Operation finished successfully');
        });
    });
};

(async () => {
    const emitter = new EventEmitter();

    const logSuccess = () => print('Async operation successful!');
    const logTimeout = (err) => print('Error:', err.message);

    emitter.on('success', logSuccess);
    emitter.on('error', logTimeout);

    try {
        const finishOperation = await asyncFunctionWithTimeout(2000);
        emitter.emit('success');
        finishOperation();
    } catch (error) {
        emitter.emit('error', error);
    }
})();
