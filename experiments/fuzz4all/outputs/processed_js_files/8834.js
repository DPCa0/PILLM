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
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }

    off(event, listenerToRemove) {
        if (!this.events.has(event)) return;
        this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
    }
}

const asyncFetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

const processData = (data) => {
    return data.map(item => ({ id: item.id, value: item.value * 2 }));
};

(async () => {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('dataReceived', data => {
        print('Data received:', data);
        const processedData = processData(data);
        print('Processed data:', processedData);
    });

    eventEmitter.on('error', error => {
        console.error('An error occurred:', error);
    });

    try {
        const data = await asyncFetchData('https://jsonplaceholder.typicode.com/posts');
        eventEmitter.emit('dataReceived', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();
