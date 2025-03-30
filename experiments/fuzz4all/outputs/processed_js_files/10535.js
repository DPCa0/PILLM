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

const asyncOperation = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Processed ${data}`), 1000);
    });
};

const processData = async function* (dataSet) {
    for (const data of dataSet) {
        yield await asyncOperation(data);
    }
};

const eventEmitter = new EventEmitter();
const data = ['data1', 'data2', 'data3'];

eventEmitter.on('dataProcessed', (result) => {
    print(result);
});

(async () => {
    for await (const processedData of processData(data)) {
        eventEmitter.emit('dataProcessed', processedData);
    }
})();
