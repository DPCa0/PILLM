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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
    await delay(1000);
    return { data: 'Sample Data' };
};

const processAsync = async function* (tasks) {
    for (const task of tasks) {
        yield await task();
    }
};

const main = async () => {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('data', data => {
        print('Received:', data);
    });

    eventEmitter.on('completed', () => {
        print('All tasks completed.');
    });

    const tasks = [fetchData, fetchData, fetchData];
    const asyncProcessor = processAsync(tasks);

    for await (const data of asyncProcessor) {
        eventEmitter.emit('data', data);
    }

    eventEmitter.emit('completed');
};

main().catch(console.error);
