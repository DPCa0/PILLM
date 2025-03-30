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

class AsyncProcessor {
    constructor() {
        this.queue = [];
    }

    addTask(task) {
        this.queue.push(task);
    }

    async run() {
        for (const task of this.queue) {
            await task();
        }
    }
}

const emitter = new EventEmitter();
const processor = new AsyncProcessor();

function createTask(message, delay) {
    return () => new Promise(resolve => {
        setTimeout(() => {
            print(message);
            emitter.emit('taskCompleted', message);
            resolve();
        }, delay);
    });
}

emitter.on('taskCompleted', (message) => {
    print(`Task completed: ${message}`);
});

processor.addTask(createTask('Hello, world!', 1000));
processor.addTask(createTask('Learning advanced JavaScript', 1500));
processor.addTask(createTask('Async processing is cool!', 2000));

processor.run();
