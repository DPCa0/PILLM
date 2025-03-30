class Observable {
    constructor() {
        this.subscribers = new Map();
    }

    subscribe(event, handler) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(handler);
    }

    emit(event, data) {
        if (this.subscribers.has(event)) {
            this.subscribers.get(event).forEach(handler => handler(data));
        }
    }
}

const observable = new Observable();

observable.subscribe('dataEvent', async (data) => {
    print(`Received data: ${data}`);
    const processedData = await processData(data);
    print(`Processed data: ${processedData}`);
});

const processData = async (data) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.toUpperCase());
        }, 1000);
    });
};

const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("async data");
        }, 500);
    });
};

(async () => {
    const data = await fetchData();
    observable.emit('dataEvent', data);
})();
