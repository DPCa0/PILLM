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

const fetchData = url => fetch(url).then(response => response.json());

const processData = async (url) => {
    try {
        const data = await fetchData(url);
        return data.map(item => ({
            id: item.id,
            name: item.name.toUpperCase(),
            timestamp: new Date().toISOString()
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Fetch data failed');
    }
};

const cacheDecorator = (func) => {
    const cache = new Map();
    return async (arg) => {
        if (cache.has(arg)) {
            print('Cache hit');
            return Promise.resolve(cache.get(arg));
        }
        const result = await func(arg);
        cache.set(arg, result);
        return result;
    };
};

const url = 'https://jsonplaceholder.typicode.com/users';
const cachedProcessData = cacheDecorator(processData);
const events = new EventEmitter();

events.on('dataProcessed', data => print('Data Processed:', data));
events.on('error', err => print('Error Occurred:', err));

(async () => {
    try {
        const data = await cachedProcessData(url);
        events.emit('dataProcessed', data);
    } catch (err) {
        events.emit('error', err);
    }
})();
