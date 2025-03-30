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
            this.events.get(event).forEach(listener => listener.apply(null, args));
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event);
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }
}

const asyncOperation = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const runAsyncTasks = async () => {
    const ee = new EventEmitter();

    ee.on('start', () => print('Task Started'));
    ee.on('progress', (progress) => print(`Progress: ${progress}%`));
    ee.on('end', () => print('Task Completed'));

    ee.emit('start');

    for (let i = 10; i <= 100; i += 10) {
        await asyncOperation(500);
        ee.emit('progress', i);
    }

    ee.emit('end');
};

runAsyncTasks();
