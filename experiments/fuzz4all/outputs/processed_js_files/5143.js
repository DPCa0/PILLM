class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(event, ...args) {
        if (!this.events.has(event)) return;
        const promises = this.events.get(event).map(fn => Promise.resolve().then(() => fn(...args)));
        await Promise.all(promises);
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }
}

const pipeline = (...functions) => input => functions.reduce((chain, func) => chain.then(func), Promise.resolve(input));

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

const step1 = async value => {
    await delay(500);
    print(`Step 1 processing value: ${value}`);
    return value * 2;
};

const step2 = async value => {
    await delay(300);
    print(`Step 2 processing value: ${value}`);
    return value + 3;
};

const step3 = async value => {
    await delay(200);
    print(`Step 3 processing value: ${value}`);
    return value - 1;
};

const process = pipeline(step1, step2, step3);

emitter.on('start', async input => {
    print('Pipeline starting...');
    const result = await process(input);
    print(`Final result: ${result}`);
    emitter.emit('finish', result);
});

emitter.on('finish', result => {
    print('Pipeline finished with result:', result);
});

(async () => {
    print('Emitting "start" event');
    await emitter.emit('start', 5);
})();
