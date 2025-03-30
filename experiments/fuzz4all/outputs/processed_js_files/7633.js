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

const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
};

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

(async () => {
    const emitter = new EventEmitter();
    
    const logMessage = (message) => print(`Received message: ${message}`);
    const debouncedLog = debounce(logMessage, 300);
    
    emitter.on('data', async (url) => {
        const data = await fetchData(url);
        if (data) {
            emitter.emit('message', `Data fetched: ${JSON.stringify(data).slice(0, 100)}...`);
        }
    });
    
    emitter.on('message', debouncedLog);
    
    emitter.emit('data', 'https://jsonplaceholder.typicode.com/posts/1');
})();
