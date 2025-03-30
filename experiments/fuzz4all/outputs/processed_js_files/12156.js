class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(listener => listener(...args));
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const executeSequentially = async (...funcs) => {
    for (const func of funcs) {
        await func();
    }
};

const asyncTask = (name, time) => async () => {
    print(`Starting ${name}`);
    await delay(time);
    print(`Completed ${name}`);
};

const tasks = [
    asyncTask('Task 1', 1000),
    asyncTask('Task 2', 1500),
    asyncTask('Task 3', 500)
];

const emitter = new EventEmitter();

emitter.on('start', () => print('Starting sequence...'));
emitter.on('end', () => print('Sequence complete!'));

(async () => {
    emitter.emit('start');
    await executeSequentially(...tasks);
    emitter.emit('end');
})();
