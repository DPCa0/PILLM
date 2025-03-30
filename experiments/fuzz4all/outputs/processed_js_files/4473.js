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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncOp = async (id) => {
    print(`Operation ${id} starting`);
    await new Promise(resolve => setTimeout(resolve, 1000 * Math.random()));
    print(`Operation ${id} completed`);
    return id;
};

const race = async (...promises) => {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(resolve).catch(reject);
        });
    });
};

(async function main() {
    const emitter = new EventEmitter();

    emitter.on('start', (id) => print(`Start event for operation ${id}`));
    emitter.on('complete', (id) => print(`Complete event for operation ${id}`));

    const operations = [1, 2, 3, 4, 5].map(id => {
        emitter.emit('start', id);
        return asyncOp(id).then(result => {
            emitter.emit('complete', result);
            return result;
        });
    });

    const firstCompleted = await race(...operations);
    print(`First completed operation: ${firstCompleted}`);
})();
