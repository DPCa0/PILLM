class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(eventName, ...args) {
        if (this.events.has(eventName)) {
            for (const listener of this.events.get(eventName)) {
                await listener(...args);
            }
        }
    }

    on(eventName, listener) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(listener);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fibonacciGenerator = function* (max = 10) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < max; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
};

const asyncEmitter = new AsyncEventEmitter();
const fibGen = fibonacciGenerator(15);

asyncEmitter.on('fibonacci', async number => {
    print(`Fibonacci number: ${number}`);
    await delay(500);  
});

(async () => {
    for (let fibNumber of fibGen) {
        await asyncEmitter.emit('fibonacci', fibNumber);
    }
})();
