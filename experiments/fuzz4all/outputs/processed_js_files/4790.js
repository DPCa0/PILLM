class EventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) this.#events.set(event, []);
        this.#events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (!this.#events.has(event)) return;
        this.#events.get(event).forEach(listener => listener(...args));
    }
}

class Deferred {
    promise;
    resolve;
    reject;

    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}

async function asyncTask(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Processed: ${data}`), 1000);
    });
}

async function* dataStream(dataArray) {
    for (const data of dataArray) {
        yield await asyncTask(data);
    }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('data', (msg) => print(msg));

(async () => {
    const dataQueue = ['a', 'b', 'c', 'd'];
    const deferred = new Deferred();

    setTimeout(() => {
        deferred.resolve();
    }, 5000);

    eventEmitter.on('complete', () => {
        print('All data processed.');
    });

    for await (const processedData of dataStream(dataQueue)) {
        eventEmitter.emit('data', processedData);
    }

    await deferred.promise;
    eventEmitter.emit('complete');
})();
