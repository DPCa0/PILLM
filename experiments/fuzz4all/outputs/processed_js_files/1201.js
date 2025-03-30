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

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

class DataService {
    constructor(url) {
        this.url = url;
        this.data = [];
        this.eventEmitter = new EventEmitter();
    }

    async updateData() {
        try {
            const newData = await fetchData(this.url);
            this.data = newData;
            this.eventEmitter.emit('dataUpdated', this.data);
        } catch (error) {
            console.error('Failed to update data:', error);
            this.eventEmitter.emit('error', error);
        }
    }

    onDataUpdate(listener) {
        this.eventEmitter.on('dataUpdated', listener);
    }

    onError(listener) {
        this.eventEmitter.on('error', listener);
    }
}

const dataService = new DataService('https://jsonplaceholder.typicode.com/posts');
const debouncedUpdate = debounce(() => dataService.updateData(), 1000);

dataService.onDataUpdate(data => {
    print('Data updated:', data);
});

dataService.onError(error => {
    console.error('Error:', error);
});

 
debouncedUpdate();
debouncedUpdate();
setTimeout(debouncedUpdate, 500);
setTimeout(debouncedUpdate, 1500);
