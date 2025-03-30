const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }
}

const processData = (data) => {
    return data.map(({ id, title }) => ({ id, title: title.toUpperCase() }));
};

(async () => {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('dataReady', (processedData) => {
        print('Processed Data:', processedData);
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const processedData = processData(data);
        eventEmitter.emit('dataReady', processedData);
    } catch (error) {
        console.error('Error:', error);
    }
})();
