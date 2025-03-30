class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (!this.events.has(event)) return;
        for (let listener of this.events.get(event)) listener(...args);
    }
}

const asyncDelay = ms => new Promise(resolve => setTimeout(resolve, ms));

const uniqueArray = array => [...new Set(array)];

const pipeline = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

class Task {
    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    async run() {
        this.eventEmitter.emit('start', 'Task started');
        await asyncDelay(1000);

        let numbers = [1, 2, 2, 3, 3, 4];
        let uniqueNumbers = uniqueArray(numbers);

        const square = x => x * x;
        const sum = (a, b) => a + b;

        let result = pipeline(
            arr => arr.map(square),
            arr => arr.reduce(sum, 0)
        )(uniqueNumbers);

        this.eventEmitter.emit('complete', `Task completed with result: ${result}`);
    }

    onStart(listener) {
        this.eventEmitter.on('start', listener);
    }

    onComplete(listener) {
        this.eventEmitter.on('complete', listener);
    }
}

const task = new Task();

task.onStart(message => print(message));
task.onComplete(message => print(message));

task.run();
