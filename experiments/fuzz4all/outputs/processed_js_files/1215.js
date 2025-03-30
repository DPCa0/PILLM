class EventEmitter {
    #listeners = new Map();

    on(event, listener) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, []);
        }
        this.#listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.#listeners.has(event)) {
            this.#listeners.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncOperation = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Data from async operation'), 1000);
    });
};

const main = async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('data', async (message) => {
        print(`Received message: ${message}`);
        const asyncData = await asyncOperation();
        print(asyncData);
    });

    const processMessages = async function* () {
        yield 'Message 1';
        yield 'Message 2';
    };

    for await (let message of processMessages()) {
        eventEmitter.emit('data', message);
    }
};

main();
