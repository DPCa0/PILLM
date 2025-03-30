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

const asyncTask = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Processed: ${data}`), 1000);
    });
};

const eventEmitter = new EventEmitter();

eventEmitter.on('dataProcessed', async (data) => {
    print(await asyncTask(data));
});

const fetchData = async () => {
     
    return new Promise((resolve) => setTimeout(() => resolve('Hello, world!'), 500));
};

(async () => {
    const data = await fetchData();
    eventEmitter.emit('dataProcessed', data);
})();
