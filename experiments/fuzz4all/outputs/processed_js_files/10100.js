class EventEmitter {
    constructor() {
        this.events = {};
    }
  
    on(event, listener) {
        (this.events[event] || (this.events[event] = [])).push(listener);
        return this;
    }
  
    emit(event, ...args) {
        (this.events[event] || []).forEach(listener => listener.apply(this, args));
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching data from ${url}`);
    }
    return response.json();
};

const processData = async (url, processor) => {
    try {
        const data = await fetchData(url);
        return processor(data);
    } catch (error) {
        console.error('Error processing data:', error);
    }
};

const run = async () => {
    const dataProcessor = (data) => data.map(({ id, name }) => ({ id, name }));
    const url = 'https://jsonplaceholder.typicode.com/users';
  
    const result = await processData(url, dataProcessor);
    print('Processed Data:', result);
  
    const eventEmitter = new EventEmitter();
    eventEmitter.on('dataProcessed', (data) => print('Event: Data Processed', data));
  
    if (result) {
        eventEmitter.emit('dataProcessed', result);
    }
};

run();
