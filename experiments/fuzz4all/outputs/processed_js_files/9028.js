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

const asyncIterable = {
    [Symbol.asyncIterator]: () => {
        let i = 0;
        return {
            next: () => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({ value: i++, done: i > 5 });
                    }, 1000);
                });
            }
        };
    }
};

async function process() {
    for await (const num of asyncIterable) {
        print(`Processed number: ${num}`);
    }
}

function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

const eventEmitter = new EventEmitter();
const fibonacci = fibonacciGenerator();

eventEmitter.on('fibonacci', () => {
    print(`Fibonacci number: ${fibonacci.next().value}`);
});

eventEmitter.emit('fibonacci');
eventEmitter.emit('fibonacci');

process();
