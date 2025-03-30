class AsyncEventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    async emit(event, ...args) {
        if (this.events[event]) {
            await Promise.all(this.events[event].map(listener => listener(...args)));
        }
    }
}

const fibonacci = (n, memo = {0: 0, 1: 1}) => {
    if (n in memo) return memo[n];
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async (n) => {
    print(`Computing Fibonacci for ${n}`);
    print(await fibonacci(n));
});

emitter.on('data', async (n) => {
    await sleep(1000);
    print(`Processed Fibonacci for ${n} asynchronously after delay`);
});

(async () => {
    await emitter.emit('data', 10);
    print('All listeners executed');
})();
