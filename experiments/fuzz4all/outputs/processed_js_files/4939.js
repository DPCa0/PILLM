class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

(async function () {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('dataFetched', (data) => {
        print('Data fetched:', data);
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        eventEmitter.emit('dataFetched', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
