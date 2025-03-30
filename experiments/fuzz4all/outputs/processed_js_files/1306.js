class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

function asyncOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve("Success!") : reject("Failed!");
        }, 1000);
    });
}

(async () => {
    const emitter = new EventEmitter();

    emitter.on('success', message => print(`Success Event: ${message}`));
    emitter.on('error', error => print(`Error Event: ${error}`));

    try {
        const result = await asyncOperation();
        emitter.emit('success', result);
    } catch (error) {
        emitter.emit('error', error);
    }

    const fibonacci = function* (n) {
        let [a, b] = [0, 1];
        while (n-- > 0) {
            [a, b] = [b, a + b];
            yield a;
        }
    };

    print('Fibonacci Sequence:');
    for (let num of fibonacci(10)) {
        print(num);
    }
})();
