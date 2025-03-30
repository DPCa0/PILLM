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

const asyncTimeout = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const fibonacci = function* (n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
};

(async () => {
    const emitter = new EventEmitter();
    
    emitter.on('data', async (num) => {
        await asyncTimeout(1000);
        print(`Received: ${num}`);
    });

    emitter.on('done', () => {
        print('Sequence complete.');
    });

    print('Starting Fibonacci sequence:');
    for (const num of fibonacci(5)) {
        emitter.emit('data', num);
    }
    
    emitter.emit('done');
})();
