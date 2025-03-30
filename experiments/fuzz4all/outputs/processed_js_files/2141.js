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
}

const fetchDataWithTimeout = async (url, timeout = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        return await response.json();
    } catch (error) {
        throw error.name === 'AbortError' 
            ? new Error('Request timed out') 
            : error;
    } finally {
        clearTimeout(timeoutId);
    }
};

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('dataFetched', (data) => {
        print('Data fetched:', data);
    });

    eventEmitter.on('error', (error) => {
        console.error('An error occurred:', error.message);
    });

    try {
        const data = await fetchDataWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 3000);
        eventEmitter.emit('dataFetched', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();
