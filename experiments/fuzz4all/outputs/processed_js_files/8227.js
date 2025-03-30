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
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

class DataManager {
    constructor() {
        this.cache = new Map();
    }

    async getData(url) {
        if (this.cache.has(url)) {
            return this.cache.get(url);
        } else {
            const data = await fetchData(url);
            this.cache.set(url, data);
            return data;
        }
    }
}

 
const emitter = new EventEmitter();
emitter.on('dataFetched', data => print('Data:', data));

const dataManager = new DataManager();
const debouncedFetch = debounce(async (url) => {
    try {
        const data = await dataManager.getData(url);
        emitter.emit('dataFetched', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}, 300);

debouncedFetch('https://jsonplaceholder.typicode.com/todos/1');
