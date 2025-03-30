class AsyncEventEmitter {
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
        const listeners = this.listeners.get(event);
        if (!listeners || listeners.length === 0) return;
        
         
        return Promise.all(listeners.map(listener => listener(...args)));
    }
}

function delayedResult(value, delay) {
    return new Promise(resolve => setTimeout(() => resolve(value), delay));
}

async function fetchData(id) {
    print(`Fetching data for ID: ${id}`);
    const data = await delayedResult({ id, value: Math.random() * 100 }, 1000);
    print(`Data for ID ${id} fetched:`, data);
    return data;
}

(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('dataFetched', async (id) => {
        const data = await fetchData(id);
        return data;
    });

    emitter.on('dataFetched', async (id) => {
        print(`Processing data for ID ${id}...`);
        const processedData = await delayedResult(`Processed data for ID: ${id}`, 500);
        print(processedData);
        return processedData;
    });

    print('Emitting dataFetched event...');
    const results = await emitter.emit('dataFetched', 1);
    print('All processing done:', results);
})();
