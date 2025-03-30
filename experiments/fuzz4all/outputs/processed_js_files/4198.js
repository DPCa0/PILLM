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

const asyncProcess = async function* (arr) {
    for (const item of arr) {
        yield new Promise(resolve => setTimeout(() => resolve(item * item), 100));
    }
};

const runComplexTask = async () => {
    const emitter = new EventEmitter();
    emitter.on('data', data => print(`Squared: ${data}`));

    const dataArray = [1, 2, 3, 4, 5];
    const process = asyncProcess(dataArray);

    for await (const data of process) {
        emitter.emit('data', data);
    }
};

runComplexTask();
