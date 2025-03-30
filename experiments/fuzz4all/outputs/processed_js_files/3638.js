class DataFetcher {
    constructor(url) {
        this.url = url;
    }
    
    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(...args));
    }
}

const processData = async (url) => {
    const fetcher = new DataFetcher(url);
    const data = await fetcher.fetchData();
    const transformedData = data.map(item => ({...item, processed: true}));
    return transformedData;
};

const main = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('dataProcessed', (data) => {
        print('Data received and processed:', data.slice(0, 5));
    });

    try {
        const processedData = await processData(url);
        eventEmitter.emit('dataProcessed', processedData);
    } catch (error) {
        console.error('Error in data processing:', error);
    }
};

main();
