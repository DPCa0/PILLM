 
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
    
    off(event, listenerToRemove) {
        if (!this.events.has(event)) return;
        const listeners = this.events.get(event);
        this.events.set(event, listeners.filter(listener => listener !== listenerToRemove));
    }
}

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Sample Data' });
        }, 1000);
    });
}

const emitter = new EventEmitter();

emitter.on('data', async (url) => {
    try {
        const result = await fetchData(url);
        print('Data received:', result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

const listener = (message) => {
    print('Message received:', message);
};

emitter.on('message', listener);

 
emitter.emit('data', 'https://api.example.com');
emitter.emit('message', 'Hello, EventEmitter!');
emitter.off('message', listener);
emitter.emit('message', 'This will not be logged');
