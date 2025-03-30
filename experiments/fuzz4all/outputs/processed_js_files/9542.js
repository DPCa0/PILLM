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

const asyncFetch = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
};

(async () => {
    const eventEmitter = new EventEmitter();
    
    const processData = async (data) => {
        print('Processing Data:', data);
        const filteredData = data.filter(item => item.id % 2 === 0);
        print('Filtered Data:', filteredData);
    };

    eventEmitter.on('dataFetched', processData);

    try {
        const data = await asyncFetch('https://jsonplaceholder.typicode.com/todos');
        eventEmitter.emit('dataFetched', data);
    } catch (error) {
        console.error('Error in data handling:', error);
    }
})();
