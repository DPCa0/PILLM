class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    async emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                await listener(...args);
            }
        }
    }
}

const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    return data;
};

const processData = (data) => {
    return new Proxy(data, {
        get(target, prop, receiver) {
            if (prop in target) {
                return Reflect.get(target, prop, receiver);
            } else {
                throw new Error(`Property ${prop} does not exist`);
            }
        }
    });
};

const emitter = new AsyncEventEmitter();

emitter.on('dataReceived', async (data) => {
    try {
        const processedData = processData(data);
        print('Processed Data:', processedData.title.toUpperCase());
    } catch (error) {
        console.error(error.message);
    }
});

(async () => {
    try {
        const data = await fetchData();
        await emitter.emit('dataReceived', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
