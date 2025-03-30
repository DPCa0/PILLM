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

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
};

const processData = (data) => {
    return data.map(item => ({ ...item, processedAt: new Date() }));
};

const emitter = new EventEmitter();

emitter.on('dataReceived', async (url) => {
    try {
        const data = await fetchData(url);
        const processedData = processData(data);
        print('Processed Data:', processedData);
        emitter.emit('dataProcessed', processedData);
    } catch (error) {
        console.error('Data processing error:', error);
    }
});

emitter.on('dataProcessed', (processedData) => {
    const result = processedData.reduce((acc, item) => acc + item.value, 0);
    print('Final Result:', result);
});

 
emitter.emit('dataReceived', 'https://api.example.com/data');
